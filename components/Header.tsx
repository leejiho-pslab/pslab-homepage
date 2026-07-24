"use client";
import Link from "next/link";
import { useState } from "react";
import { NAV, BROCHURE } from "@/lib/site";

// active: 현재 페이지 경로("/about" 등) · dark: ALWAYS ON 다크 헤더
export default function Header({ active, dark }: { active?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`header${dark ? " dark" : ""}`}>
      <Link href="/" className="brand" aria-label="P.S.LAB 홈" onClick={close}>
        {!dark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logo.jpg" alt="P.S.LAB 로고" className="brand-logo" />
        )}
        <span className="brand-name">P.S.LAB</span>
        <span className="brand-tag">문제 해결 연구소</span>
      </Link>

      {/* 데스크톱 내비 */}
      <nav className="nav nav-desktop">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={active === n.href ? "active" : ""}
            style={n.dot ? { display: "flex", alignItems: "center", gap: 7 } : undefined}
          >
            {n.label}
            {n.dot && <span className="dot" />}
          </Link>
        ))}
        <a href={BROCHURE.href} download={BROCHURE.filename} className="nav-brochure">
          소개서 <span aria-hidden>↓</span>
        </a>
        <Link href="/contact" className={`btn ${dark ? "btn-pill-light" : "btn-pill-dark"}`}>
          문의하기
        </Link>
      </nav>

      {/* 모바일 햄버거 버튼 */}
      <button
        className={`nav-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {/* 모바일 메뉴 패널 */}
      {open && (
        <div className="mobile-menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={active === n.href ? "active" : ""} onClick={close}>
              {n.label}
              {n.dot && <span className="dot" />}
            </Link>
          ))}
          <a href={BROCHURE.href} download={BROCHURE.filename} onClick={close}>
            솔루션 소개서 <span aria-hidden>↓</span>
          </a>
          <Link href="/contact" className={`btn ${dark ? "btn-pill-light" : "btn-pill-dark"} mm-cta`} onClick={close}>
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
