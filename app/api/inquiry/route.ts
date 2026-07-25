import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function notifyTelegram(name: string, contact: string, topic: string, message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const text =
    `📩 <b>P.S.LAB 새 문의</b>\n\n` +
    `<b>이름/브랜드</b>: ${esc(name)}\n` +
    `<b>연락처</b>: ${esc(contact)}\n` +
    `<b>관심 분야</b>: ${esc(topic)}\n\n` +
    `${esc(message)}`;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
  } catch {}
}

async function notifyEmail(name: string, contact: string, topic: string, message: string) {
  try {
    await fetch(`https://formsubmit.co/ajax/${SITE.contact.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        "이름/브랜드": name,
        연락처: contact,
        "관심 분야": topic,
        문의내용: message,
        _subject: `[P.S.LAB 문의] ${name}`,
        _template: "table",
        _captcha: "false",
      }),
    });
  } catch {}
}

async function saveToSupabase(name: string, contact: string, topic: string, message: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return;
  try {
    const sb = createClient(url, anon);
    await sb.from("inquiries").insert({ name, contact, topic, message });
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

  const name = String(body.name ?? "").trim().slice(0, 200);
  const contact = String(body.contact ?? "").trim().slice(0, 200);
  const topic = String(body.topic ?? "").trim().slice(0, 100);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const honeypot = String(body.website ?? "").trim();

  // 허니팟이 채워졌으면 봇 — 조용히 성공 응답만 반환(아무 처리 안 함)
  if (honeypot) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "이름/연락처를 입력해 주세요." }, { status: 400 });
  }

  // 세 채널 병렬 처리(각자 실패해도 나머지는 진행)
  await Promise.allSettled([
    saveToSupabase(name, contact, topic, message),
    notifyTelegram(name, contact, topic, message),
    notifyEmail(name, contact, topic, message),
  ]);

  return NextResponse.json({ ok: true });
}
