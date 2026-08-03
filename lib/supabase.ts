import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 환경변수(Vercel에 등록)가 있을 때만 활성화 — 셋업 전에도 사이트는 정상 동작
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && anon);

export const supabase: SupabaseClient | null = supabaseEnabled ? createClient(url as string, anon as string) : null;

export type Inquiry = {
  id: string;
  created_at: string;
  name: string | null;
  contact: string | null;
  topic: string | null;
  message: string | null;
  status: "new" | "read" | "replied" | string;
  // 확장 항목 (구 스키마에서는 없을 수 있음)
  company?: string | null;
  manager?: string | null;
  position?: string | null;
  phone?: string | null;
  email?: string | null;
  budget?: string | null;
};
