"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { HOME_WORKS, catEn } from "@/lib/works";
import { cdnImg } from "@/lib/assets";

// 홈 포트폴리오 자동 캐러셀
// 노출 장수 반응형: 모바일 1장 / 태블릿 2장 / 데스크톱 3장 (좁은 화면 텍스트·이미지 잘림 방지)
export default function PortfolioCarousel() {
  const list = HOME_WORKS;
  const [perView, setPerView] = useState(3);
  const [slide, setSlide] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const calc = () => setPerView(window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const slideCount = Math.max(1, list.length - perView + 1);

  // 화면 크기 변경 시 현재 슬라이드가 범위를 벗어나지 않게 보정
  useEffect(() => {
    setSlide((s) => Math.min(s, slideCount - 1));
  }, [slideCount]);

  useEffect(() => {
    const t = setInterval(() => {
      if (paused.current) return;
      setSlide((s) => (s + 1) % slideCount);
    }, 1000);
    return () => clearInterval(t);
  }, [slideCount]);

  const cover = (img: string): CSSProperties => ({
    aspectRatio: "4 / 5",
    borderRadius: 14,
    padding: "26px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    color: "#fff",
    textShadow: "0 1px 14px rgba(0,0,0,.35)",
    backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0) 40%,rgba(0,0,0,.45)),url(${cdnImg(img)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <div className="pad-sec" style={{ maxWidth: 1200, margin: "56px auto 0", padding: "0 29px", overflow: "hidden" }}>
      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={() => window.setTimeout(resume, 2500)}
        style={{
          display: "flex",
          margin: "0 -11px",
          transform: `translateX(-${slide * (100 / perView)}%)`,
          transition: "transform .55s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {list.map((w) => (
          <Link
            key={w.name}
            href="/portfolio"
            style={{ flex: `0 0 ${100 / perView}%`, boxSizing: "border-box", padding: "0 11px", display: "block" }}
          >
            <div style={cover(w.img)}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".22em", opacity: 0.55 }}>
                {catEn[w.cat]}
              </span>
              <span style={{ fontSize: "clamp(26px,2.6vw,38px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.15 }}>
                {w.name}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, gap: 10 }}>
              <span style={{ fontWeight: 800, fontSize: 19 }}>{w.name}</span>
              <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap" }}>{w.cat}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 14.5, color: "var(--muted)", lineHeight: 1.55 }}>{w.desc}</p>
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 34, flexWrap: "wrap" }}>
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => setSlide(i)}
            style={{
              width: i === slide ? 26 : 8,
              height: 8,
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all .3s",
              background: i === slide ? "#101010" : "#d8d8d4",
            }}
          />
        ))}
      </div>
    </div>
  );
}
