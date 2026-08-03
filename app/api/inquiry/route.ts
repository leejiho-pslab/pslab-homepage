import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Inquiry = {
  company: string;
  manager: string;
  position: string;
  phone: string;
  email: string;
  topic: string;
  budget: string;
  message: string;
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 레거시 컬럼(name/contact)용 요약 문자열 — 구 스키마에서도 정보가 유실되지 않도록
const legacyName = (d: Inquiry) => [d.company, d.manager && `${d.manager}${d.position ? ` ${d.position}` : ""}`].filter(Boolean).join(" / ");
const legacyContact = (d: Inquiry) => [d.phone, d.email].filter(Boolean).join(" · ");

async function notifyTelegram(d: Inquiry) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const text =
    `📩 <b>P.S.LAB 새 문의</b>\n\n` +
    `<b>회사명</b>: ${esc(d.company)}\n` +
    `<b>담당자</b>: ${esc(d.manager)}${d.position ? ` ${esc(d.position)}` : ""}\n` +
    `<b>연락처</b>: ${esc(d.phone || "-")}\n` +
    `<b>이메일</b>: ${esc(d.email || "-")}\n` +
    `<b>관심 분야</b>: ${esc(d.topic)}\n` +
    `<b>월 운영예산</b>: ${esc(d.budget)}\n\n` +
    `${esc(d.message)}`;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
  } catch {}
}

async function notifyEmail(d: Inquiry) {
  try {
    // FormSubmit은 소문자 주소 기준으로 동작 — 대문자 주소로 인한 미발송 방지
    await fetch(`https://formsubmit.co/ajax/${SITE.contact.email.toLowerCase()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        회사명: d.company,
        담당자: `${d.manager}${d.position ? ` ${d.position}` : ""}`,
        연락처: d.phone,
        이메일: d.email,
        "관심 분야": d.topic,
        "월 운영예산": d.budget,
        문의내용: d.message,
        _subject: `[P.S.LAB 문의] ${d.company}`,
        _template: "table",
        _captcha: "false",
      }),
    });
  } catch {}
}

async function saveToSupabase(d: Inquiry) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return;
  try {
    const sb = createClient(url, anon);
    // 확장 스키마 우선 — 컬럼이 없으면(구 스키마) 레거시 형태로 재시도해 유실 방지
    const full = {
      name: legacyName(d),
      contact: legacyContact(d),
      topic: d.topic,
      message: d.message,
      company: d.company,
      manager: d.manager,
      position: d.position,
      phone: d.phone,
      email: d.email,
      budget: d.budget,
    };
    const { error } = await sb.from("inquiries").insert(full);
    if (!error) return;
    const legacyMessage =
      `[회사] ${d.company}\n[담당자] ${d.manager}${d.position ? ` ${d.position}` : ""}\n` +
      `[전화] ${d.phone || "-"}\n[이메일] ${d.email || "-"}\n[월 운영예산] ${d.budget}\n\n${d.message}`;
    await sb.from("inquiries").insert({
      name: legacyName(d),
      contact: legacyContact(d),
      topic: d.topic,
      message: legacyMessage,
    });
  } catch {}
}

// 간단한 IP당 속도 제한(같은 IP가 1분에 5건 초과 시 차단) — 스팸 폭주 방지
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 1000) hits.clear(); // 메모리 보호
  return arr.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {}

  const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const d: Inquiry = {
    company: str(body.company, 200),
    manager: str(body.manager, 100),
    position: str(body.position, 100),
    phone: str(body.phone, 100),
    email: str(body.email, 200),
    topic: str(body.topic, 100),
    budget: str(body.budget, 100),
    message: str(body.message, 5000),
  };
  const honeypot = str(body.website, 200);

  // 허니팟이 채워졌으면 봇 — 조용히 성공 응답만 반환(아무 처리 안 함)
  if (honeypot) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  if (!d.company || !d.manager || (!d.phone && !d.email)) {
    return NextResponse.json({ ok: false, error: "회사명·담당자·연락처를 입력해 주세요." }, { status: 400 });
  }

  // 세 채널 병렬 처리(각자 실패해도 나머지는 진행)
  await Promise.allSettled([saveToSupabase(d), notifyTelegram(d), notifyEmail(d)]);

  return NextResponse.json({ ok: true });
}
