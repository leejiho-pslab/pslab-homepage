"use client";
import { useState, type CSSProperties } from "react";
import { CARD } from "@/lib/card";

// 온라인 명함의 상호작용 부분(공유 · 복사 · QR 펼치기)만 클라이언트로 분리.
// 저장(vCard)·전화·메일은 순수 링크라 자바스크립트 없이도 동작한다.

const row: CSSProperties = { display: "flex", gap: 10 };

export default function CardActions() {
  const [copied, setCopied] = useState("");
  const [qrOpen, setQrOpen] = useState(false);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 권한이 없는 브라우저 대비 — 임시 입력창으로 폴백
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(el);
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? "" : c)), 1600);
  };

  const share = async () => {
    const data = {
      title: `${CARD.name} ${CARD.title} · ${CARD.org}`,
      text: `${CARD.orgFull} — ${CARD.name} ${CARD.title}`,
      url: CARD.url,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        return; // 사용자가 공유창을 닫은 경우 — 조용히 종료
      }
    }
    copy(CARD.url, "share");
  };

  return (
    <>
      <div style={{ ...row, marginTop: 12 }}>
        <button onClick={share} className="card-btn card-btn-ghost" style={{ flex: 1 }}>
          {copied === "share" ? "주소 복사됨" : "명함 공유"}
        </button>
        <button onClick={() => setQrOpen((v) => !v)} className="card-btn card-btn-ghost" style={{ flex: 1 }}>
          {qrOpen ? "QR 닫기" : "QR 보기"}
        </button>
      </div>

      {qrOpen && (
        <div className="card-qr-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/card-qr.svg" alt="P.S.LAB 이지호 소장 온라인 명함 QR 코드" width={168} height={168} />
          <p>상대방 카메라로 찍으면 이 명함이 열립니다</p>
        </div>
      )}

      <div className="card-copy-row">
        <button onClick={() => copy(CARD.phone, "tel")}>{copied === "tel" ? "복사됨" : "번호 복사"}</button>
        <span aria-hidden>·</span>
        <button onClick={() => copy(CARD.email, "mail")}>{copied === "mail" ? "복사됨" : "메일 복사"}</button>
      </div>
    </>
  );
}
