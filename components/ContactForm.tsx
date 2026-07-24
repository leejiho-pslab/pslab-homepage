"use client";
import { useRef, useState, type CSSProperties } from "react";
import { SITE } from "@/lib/site";

const TOPICS = ["광고대행 전반", "퍼포먼스 마케팅", "콘텐츠 · 영상 제작", "ALWAYS ON 도입"];

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

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

  const send = () => {
    const body = encodeURIComponent(
      `이름/브랜드: ${nameRef.current?.value || ""}\n연락처: ${phoneRef.current?.value || ""}\n관심 분야: ${topic}\n\n${
        msgRef.current?.value || ""
      }`
    );
    const subject = encodeURIComponent(`[P.S.LAB 문의] ${nameRef.current?.value || ""}`);
    window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const labelStyle: CSSProperties = { fontSize: 13.5, fontWeight: 700 };
  const groupStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 44,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        height: "fit-content",
      }}
    >
      <div style={groupStyle}>
        <label style={labelStyle}>이름 / 브랜드</label>
        <input ref={nameRef} className="field" placeholder="예) 홍길동 / 마이브랜드" />
      </div>
      <div style={groupStyle}>
        <label style={labelStyle}>연락처</label>
        <input ref={phoneRef} className="field" placeholder="이메일 또는 전화번호" />
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
        {sent ? "메일 앱이 열렸습니다 ✓" : "문의 보내기"}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
        전송 버튼을 누르면 메일 앱으로 내용이 전달됩니다
      </p>
    </div>
  );
}
