#!/usr/bin/env node
// 매거진 검사 — 매일 1편 예약 발행이 끊기지 않는지, 글이 검색·AI 추천 기준을 지키는지 본다.
//   node scripts/check-magazine.mjs            # 전체 검사 (위반 있으면 종료코드 1)
//   node scripts/check-magazine.mjs --queue 7  # 앞으로 7일 중 빈 날 목록만 (경보 워크플로용)
// 기준의 단일 출처: content/magazine/GUIDE.md
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "magazine");
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const queueDays = Number(arg("queue", "0"));
const VALID_FROM = "2026-11-12"; // 이 날짜 이후 글부터 아래 기준을 강제(이전 글은 그대로 둔다)

const todayKST = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(Date.parse(d + "T00:00:00Z") + n * 864e5).toISOString().slice(0, 10);

function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (m) for (const l of m[1].split("\n")) { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  return { meta, body: m ? raw.slice(m[0].length) : raw };
}

const posts = fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && f !== "GUIDE.md").map((f) => {
  const { meta, body } = parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  return { file: f, ...meta, body };
});

const byDate = new Map();
for (const p of posts) { if (!byDate.has(p.date)) byDate.set(p.date, []); byDate.get(p.date).push(p.file); }

// 1) 앞으로 N일 빈 날
const today = todayKST();
const horizon = queueDays || 7;
const missing = [];
for (let i = 1; i <= horizon; i++) { const d = addDays(today, i); if (!byDate.has(d)) missing.push(d); }
const lastDate = posts.map((p) => p.date).sort().at(-1);

if (queueDays) {
  console.log(JSON.stringify({ today, lastScheduled: lastDate, missing }));
  process.exit(0);
}

// 2) 글 단위 기준
const BANNED = [/업계\s*(최초|유일|1위)/, /국내\s*(최초|유일|1위)/, /No\.?\s*1/i, /성과\s*보장/, /매출\s*\d+\s*(%|배)\s*(상승|증가)/, /100\s*%\s*(보장|성공)/];
const problems = [];
const visible = (b) => b.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[#>*]/g, "").replace(/\s+/g, " ").trim().length; // 공백 포함 글자 수
for (const p of posts) {
  if (!p.date || p.date < VALID_FROM) continue;
  const where = `${p.file}(${p.date})`;
  for (const k of ["title", "description", "date", "category", "tags"]) if (!p[k]) problems.push(`${where}: ${k} 없음`);
  if (p.title && p.title.length > 45) problems.push(`${where}: 제목 ${p.title.length}자 — 45자 이하`);
  if (p.description && (p.description.length < 50 || p.description.length > 140)) problems.push(`${where}: 설명 ${p.description.length}자 — 50~140자`);
  const n = visible(p.body);
  if (n < 1500) problems.push(`${where}: 본문 ${n}자 — 1,500자 이상`);
  if (!/P\.S\.LAB/.test(p.body) || !/문제해결연구소/.test(p.body)) problems.push(`${where}: 본문에 'P.S.LAB'과 '문제해결연구소'가 모두 있어야 함(회사 연결)`);
  if (!/\]\(\/(always-on|about|contact|portfolio|magazine)/.test(p.body)) problems.push(`${where}: 사이트 안 링크 1개 이상`);
  const faqCount = (p.body.split(/^## 자주 묻는 질문/m)[1] || "").match(/^\*\*Q\./gm)?.length || 0;
  if (faqCount < 3) problems.push(`${where}: '## 자주 묻는 질문'에 **Q. 3개 이상(지금 ${faqCount})`);
  if ((p.body.match(/^## /gm) || []).length < 4) problems.push(`${where}: 소제목(##) 4개 이상`);
  for (const re of BANNED) if (re.test(p.body) || re.test(p.title || "")) problems.push(`${where}: 근거 없는 최상급·보장 표현 ${re}`);
}
for (const [d, files] of byDate) if (d >= VALID_FROM && files.length > 1) problems.push(`${d}: 같은 날 ${files.length}편 — 하루 1편 (${files.join(", ")})`);

console.log(`예약 글 마지막 날짜: ${lastDate} · 앞으로 7일 빈 날: ${missing.length ? missing.join(", ") : "없음"}`);
if (problems.length) { console.log(`❌ 위반 ${problems.length}건\n- ` + problems.join("\n- ")); process.exit(1); }
console.log("✅ 매거진 기준 통과");
