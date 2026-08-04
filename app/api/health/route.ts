import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 상태 확인 + Supabase 활동 유지(keepalive) 엔드포인트.
//
// Supabase 무료 플랜은 일정 기간 프로젝트에 아무 요청이 없으면 자동 일시정지된다.
// 문의가 뜸한 주에도 정지되지 않도록 GitHub Actions가 주기적으로 이 주소를 호출한다
// (.github/workflows/supabase-keepalive.yml). 워크플로에 시크릿을 넣지 않아도 되도록
// 실제 DB 호출은 서버(Vercel 환경변수)에서 수행한다.
//
// 응답에는 어떤 문의 데이터도 담지 않는다 — 공개 주소이므로 상태만 반환.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // DB 미설정 상태에서도 사이트 자체는 정상이므로 200으로 알린다.
    return NextResponse.json({ ok: true, db: "not_configured", ts: new Date().toISOString() });
  }

  try {
    const sb = createClient(url, anon);
    // 실제 Postgres 왕복이 일어나는 최소 질의. RLS 때문에 anon 에게는 행이
    // 보이지 않지만(=데이터 노출 없음) 요청 자체가 활동으로 집계된다.
    const { error } = await sb.from("inquiries").select("id", { head: true, count: "exact" }).limit(1);
    if (error) {
      return NextResponse.json({ ok: false, db: "error", detail: error.message }, { status: 503 });
    }
    return NextResponse.json({ ok: true, db: "reachable", ts: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ ok: false, db: "unreachable", detail: String(e).slice(0, 200) }, { status: 503 });
  }
}
