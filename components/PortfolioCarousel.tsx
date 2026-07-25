"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { HOME_WORKS, catEn } from "@/lib/works";
import FitCover from "@/components/FitCover";

// 홈 포트폴리오 캐러셀: 자동 넘김 + 좌우 화살표 + 스와이프
// 노출 장수 반응형: 모바일 1장 / 태블릿 2장 / 데스크톱 3장
export default function PortfolioCarousel() {
  const list = HOME_WORKS;
  const [perView, setPerView] = useState(3);
  const [slide, setSlide] = useState(0);
  const paused = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    // 모바일도 2장 동시 노출(한눈에 여러 개), 데스크톱 3장
    const calc = () => setPerView(window.innerWidth <= 1024 ? 2 : 3);
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

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);
  // 수동 조작 후 4초간 자동 넘김 일시정지
  const holdAuto = () => {
    paused.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => (paused.current = false), 4000);
  };
  const prev = () => {
    holdAuto();
    setSlide((s) => (s - 1 + slideCount) % slideCount);
  };
  const next = () => {
    holdAuto();
    setSlide((s) => (s + 1) % slideCount);
  };

  const arrowStyle = (side: "left" | "right"): CSSProperties => ({
    position: "absolute",
    [side]: 6,
    top: "38%",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1px solid #e0e0dc",
    background: "rgba(255,255,255,.94)",
    boxShadow: "0 6px 20px -8px rgba(16,16,16,.25)",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#101010",
    transition: "background .2s, transform .2s",
  });

  return (
    <div className="pad-sec" style={{ position: "relative", maxWidth: 1200, margin: "56px auto 0", padding: "0 29px" }}>
      {/* 좌우 화살표 */}
      <button aria-label="이전 슬라이드" onClick={prev} style={arrowStyle("left")}>
        ←
      </button>
      <button aria-label="다음 슬라이드" onClick={next} style={arrowStyle("right")}>
        →
      </button>

      <div style={{ overflow: "hidden" }}>
        <div
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={(e) => {
            pause();
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const x0 = touchX.current;
            touchX.current = null;
            if (x0 !== null) {
              const dx = e.changedTouches[0].clientX - x0;
              if (dx > 40) prev();
              else if (dx < -40) next();
            }
            if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
            resumeTimer.current = window.setTimeout(() => (paused.current = false), 2500);
          }}
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
              <FitCover img={w.img} aspect="4 / 5">
                <span className="hide-sm" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".22em", opacity: 0.55 }}>
                  {catEn[w.cat]}
                </span>
                <span style={{ marginTop: "auto", fontSize: "clamp(17px,2.6vw,38px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.15 }}>
                  {w.name}
                </span>
              </FitCover>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14, gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 800, fontSize: "clamp(15px,1.6vw,19px)" }}>{w.name}</span>
                <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>{w.cat}</span>
              </div>
              <p className="hide-sm" style={{ margin: "6px 0 0", fontSize: 14.5, color: "var(--muted)", lineHeight: 1.55 }}>{w.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 34, flexWrap: "wrap" }}>
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => {
              holdAuto();
              setSlide(i);
            }}
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
