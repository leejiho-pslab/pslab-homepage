"use client";
import { useCallback, useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { supabase, supabaseEnabled, type Inquiry } from "@/lib/supabase";

const STATUS: Record<string, { label: string; bg: string; fg: string }> = {
  new: { label: "신규", bg: "#ffe9e6", fg: "#c0392b" },
  read: { label: "확인", bg: "#eef0f2", fg: "#5b6470" },
  replied: { label: "답변완료", bg: "#e6f5ea", fg: "#1e7d43" },
};

function fmt(d: string) {
  try {
    return new Date(d).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return d;
  }
}

const wrap: CSSProperties = { maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" };
const card: CSSProperties = { background: "#fff", border: "1px solid #e6e6e3", borderRadius: 14, padding: "20px 22px" };

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<unknown>(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!supabaseEnabled || !supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (data) setRows(data as Inquiry[]);
  }, []);

  useEffect(() => {
    const sb = supabase;
    if (!session || !sb) return;
    load();
    const channel = sb
      .channel("inquiries-rt")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "inquiries" }, (payload) => {
        const row = payload.new as Inquiry;
        setRows((prev) => (prev.some((r) => r.id === row.id) ? prev : [row, ...prev]));
        setFreshIds((prev) => new Set(prev).add(row.id));
      })
      .subscribe();
    return () => {
      sb.removeChannel(channel);
    };
  }, [session, load]);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    setBusy(false);
    if (error) setErr("로그인 실패 — 이메일/비밀번호를 확인해 주세요.");
  };

  const logout = async () => {
    await supabase?.auth.signOut();
    setRows([]);
    setSession(null);
  };

  const setStatus = async (id: string, status: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await supabase?.from("inquiries").update({ status }).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("이 문의를 삭제할까요?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    await supabase?.from("inquiries").delete().eq("id", id);
  };

  // ---------- 렌더링 ----------
  if (!ready) return <main style={wrap}>불러오는 중…</main>;

  if (!supabaseEnabled) {
    return (
      <main style={wrap}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 16px" }}>관리자 설정 필요</h1>
        <div style={card}>
          <p style={{ margin: 0, lineHeight: 1.7, color: "#3c3c39" }}>
            아직 데이터베이스(Supabase)가 연결되지 않았어요. Vercel에 <b>SUPABASE URL / KEY</b> 2개를 등록하면
            이 화면에서 문의를 실시간으로 확인할 수 있습니다. (설정 전에도 사이트·문의 폼은 정상 작동해요.)
          </p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={{ ...wrap, maxWidth: 400 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>P.S.LAB 관리자</h1>
        <p style={{ margin: "0 0 24px", color: "#8a8a86", fontSize: 14 }}>문의 관리 로그인</p>
        <form onSubmit={login} style={{ ...card, display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="field"
            autoComplete="current-password"
          />
          {err && <p style={{ margin: 0, color: "#c0392b", fontSize: 13 }}>{err}</p>}
          <button
            type="submit"
            disabled={busy}
            style={{ background: "#101010", color: "#fff", border: "none", borderRadius: 100, padding: 15, fontSize: 15, fontWeight: 800, cursor: "pointer" }}
          >
            {busy ? "로그인 중…" : "로그인"}
          </button>
        </form>
      </main>
    );
  }

  const newCount = rows.filter((r) => r.status === "new").length;

  return (
    <main style={wrap}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            문의 관리
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#1e7d43", fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ecc71", animation: "pulse 1.6s infinite" }} />
              실시간
            </span>
          </h1>
          <p style={{ margin: "6px 0 0", color: "#8a8a86", fontSize: 13.5 }}>
            전체 {rows.length}건 · 신규 {newCount}건
          </p>
        </div>
        <button onClick={logout} style={{ background: "none", border: "1px solid #e0e0dc", borderRadius: 100, padding: "9px 18px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
          로그아웃
        </button>
      </div>

      {rows.length === 0 ? (
        <div style={{ ...card, textAlign: "center", color: "#8a8a86" }}>아직 접수된 문의가 없습니다. 새 문의가 오면 여기에 자동으로 나타나요.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => {
            const st = STATUS[r.status] || STATUS.new;
            const fresh = freshIds.has(r.id);
            return (
              <div key={r.id} style={{ ...card, borderColor: fresh ? "#2ecc71" : "#e6e6e3", boxShadow: fresh ? "0 0 0 3px rgba(46,204,113,.15)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>{r.company || r.name || "(이름 없음)"}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: st.bg, color: st.fg }}>{st.label}</span>
                    {r.topic && <span style={{ fontSize: 12.5, color: "#8a8a86" }}>· {r.topic}</span>}
                    {r.budget && (
                      <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "#eef4ff", color: "#2b5fbf" }}>
                        예산 {r.budget}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 12.5, color: "#b9b9b4" }}>{fmt(r.created_at)}</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: "#3c3c39", display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
                  {r.manager && (
                    <span>
                      담당자: <b>{r.manager}{r.position ? ` ${r.position}` : ""}</b>
                    </span>
                  )}
                  {r.phone ? (
                    <span>
                      전화: <a href={`tel:${r.phone}`}><b>{r.phone}</b></a>
                    </span>
                  ) : null}
                  {r.email ? (
                    <span>
                      이메일: <a href={`mailto:${r.email}`}><b>{r.email}</b></a>
                    </span>
                  ) : null}
                  {!r.phone && !r.email && <span>연락처: <b>{r.contact || "-"}</b></span>}
                </div>
                {r.message && (
                  <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#101010", whiteSpace: "pre-wrap" }}>{r.message}</p>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  <button onClick={() => setStatus(r.id, "read")} style={btn}>확인</button>
                  <button onClick={() => setStatus(r.id, "replied")} style={btn}>답변완료</button>
                  <button onClick={() => setStatus(r.id, "new")} style={btn}>신규로</button>
                  <button onClick={() => remove(r.id)} style={{ ...btn, color: "#c0392b", borderColor: "#f0d0cc" }}>삭제</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

const btn: CSSProperties = {
  background: "#fff",
  border: "1px solid #e0e0dc",
  borderRadius: 100,
  padding: "7px 14px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
