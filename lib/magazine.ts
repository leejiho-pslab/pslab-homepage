import fs from "fs";
import path from "path";

// ===== 매거진 엔진 =====
// content/magazine/*.md 를 읽어 발행일(date)이 지난 글만 공개.
// 새 글 추가 = md 파일 하나 추가(발행일 미래로 지정하면 그 날 자동 공개).

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD (KST 기준 공개일)
  category: string;
  tags: string[];
  body: string; // 마크다운 본문
};

const DIR = path.join(process.cwd(), "content", "magazine");

function todayKST(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

export function getAllArticles(): Article[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const today = todayKST();
  const list: Article[] = [];
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { meta, body } = parseFrontmatter(raw);
      const date = meta.date || "9999-12-31";
      if (date > today) continue; // 발행일 전 글은 숨김(자동 예약 발행)
      list.push({
        slug: f.replace(/\.md$/, ""),
        title: meta.title || f,
        description: meta.description || "",
        date,
        category: meta.category || "인사이트",
        tags: (meta.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
        body,
      });
    } catch {}
  }
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) || null;
}

// ===== 초경량 마크다운 → 블록 파서 (외부 의존성 없음) =====
export type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] };

export function parseBlocks(md: string): Block[] {
  const out: Block[] = [];
  const lines = md.split("\n");
  let para: string[] = [];
  let list: string[] = [];
  const flushPara = () => {
    if (para.length) out.push({ type: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (list.length) out.push({ type: "ul", items: list });
    list = [];
  };
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      flushPara();
      flushList();
    } else if (t.startsWith("### ")) {
      flushPara(); flushList();
      out.push({ type: "h3", text: t.slice(4) });
    } else if (t.startsWith("## ")) {
      flushPara(); flushList();
      out.push({ type: "h2", text: t.slice(3) });
    } else if (t.startsWith("> ")) {
      flushPara(); flushList();
      out.push({ type: "quote", text: t.slice(2) });
    } else if (t.startsWith("- ")) {
      flushPara();
      list.push(t.slice(2));
    } else {
      flushList();
      para.push(t);
    }
  }
  flushPara();
  flushList();
  return out;
}

// 인라인 **굵게** 분해 (링크는 본문에서 미사용 — 필요 시 확장)
export function splitBold(text: string): { bold: boolean; t: string }[] {
  return text.split(/\*\*([^*]+)\*\*/g).map((t, i) => ({ bold: i % 2 === 1, t }));
}
