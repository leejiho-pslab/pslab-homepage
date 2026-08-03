"use client";
import { useRef, useState, type CSSProperties } from "react";
import { SITE } from "@/lib/site";

const TOPICS = ["광고대행 전반", "퍼포먼스 마케팅", "콘텐츠 · 영상 제작", "ALWAYS ON 도입"];
const BUDGETS = ["미정 · 상담 후 결정", "300만 원 미만", "300~500만 원", "500~1,000만 원", "1,000만 원 이상"];

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const managerRef = useRef<HTMLInputElement | null>(null);
  const positionRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  const hpRef = useRef<HTMLInputElement | null>(null); // 허니팟(스팸봇 차단)

  const chip = (active: boolean): CSSProperties => ({
    borderRadius: 100,
    padding: "10px 18px",
    fontSize: 13.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .2s",
    background: active ? "#101010" : "#fff",
    color: active ? "#fff" : "#101010",
    border: `1px solid ${active ? "#101010" : "#e0e0dc"}`,
  });

  const collect = () => ({
    company: companyRef.current?.value?.trim() || "",
    manager: managerRef.current?.value?.trim() || "",
    position: positionRef.current?.value?.trim() || "",
    phone: phoneRef.current?.value?.trim() || "",
    email: emailRef.current?.value?.trim() || "",
    topic,
    budget,
    message: msgRef.current?.value?.trim() || "",
  });

  const openMailto = (d: ReturnType<typeof collect>) => {
    const body = encodeURIComponent(
      `회사명: ${d.company}\n담당자: ${d.manager}${d.position ? ` ${d.position}` : ""}\n연락처: ${d.phone}\n이메일: ${d.email}\n관심 분야: ${d.topic}\n월 운영예산: ${d.budget}\n\n${d.message}`
    );
    const subject = encodeURIComponent(`[P.S.LAB 문의] ${d.company}`);
    window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
  };

  const send = async () => {
    if (sending || sent) return;
    const d = collect();
    if (!d.company || !d.manager || (!d.phone && !d.email)) {
      alert("회사명, 담당자 성함, 연락처(전화 또는 이메일)를 입력해 주세요.");
      return;
    }
    setSending(true);
    // 서버(API)에서 저장·텔레그램·이메일 알림을 한 번에 처리
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, website: hpRef.current?.value || "" }),
      });
      setSending(false);
      if (res.ok) {
        setSent(true);
        return;
      }
    } catch {
      setSending(false);
    }
    // 최후: 방문자 메일 앱으로
    openMailto(d);
    setSent(true);
  };

  const labelStyle: CSSProperties = { fontSize: 13.5, fontWeight: 700 };
  const groupStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
  const req = <span style={{ color: "#c0392b", marginLeft: 3 }}>*</span>;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 44,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "fit-content",
      }}
    >
      {/* 허니팟: 사람에게는 보이지 않는 칸 — 봇이 채우면 서버에서 무시 */}
      <input
        ref={hpRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <div style={groupStyle}>
        <label style={labelStyle}>회사명{req}</label>
        <input ref={companyRef} className="field" placeholder="예) 마이브랜드 주식회사" autoComplete="organization" />
      </div>

      {/* 담당자 성함 / 직급 */}
      <div className="grid-2-keep" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
        <div style={groupStyle}>
          <label style={labelStyle}>담당자 성함{req}</label>
          <input ref={managerRef} className="field" placeholder="예) 홍길동" autoComplete="name" />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>직급</label>
          <input ref={positionRef} className="field" placeholder="예) 팀장" autoComplete="organization-title" />
        </div>
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>연락처{req}</label>
        <input ref={phoneRef} className="field" placeholder="예) 010-1234-5678" type="tel" autoComplete="tel" />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>이메일 주소{req}</label>
        <input ref={emailRef} className="field" placeholder="예) contact@mybrand.com" type="email" autoComplete="email" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={labelStyle}>관심 분야</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TOPICS.map((t) => (
            <button key={t} onClick={() => setTopic(t)} style={chip(t === topic)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={labelStyle}>월 운영예산</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {BUDGETS.map((b) => (
            <button key={b} onClick={() => setBudget(b)} style={chip(b === budget)}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>문의 내용</label>
        <textarea
          ref={msgRef}
          className="field"
          rows={5}
          placeholder="브랜드의 상황과 풀고 싶은 문제를 자유롭게 적어주세요"
        />
      </div>

      <button
        onClick={send}
        style={{
          background: "#101010",
          color: "#fff",
          border: "none",
          borderRadius: 100,
          padding: 18,
          fontSize: 16,
          fontWeight: 800,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {sending ? "전송 중…" : sent ? "접수되었습니다 ✓ 하루 안에 연락드릴게요" : "문의 보내기"}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
        제출하면 담당자에게 즉시 전달됩니다
      </p>
    </div>
  );
}
