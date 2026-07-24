"use client";
import { useState, type CSSProperties } from "react";
import { WORKS, CATEGORIES, catEn, type Category } from "@/lib/works";
import { cdnImg } from "@/lib/assets";

// 포트폴리오 필터 칩 + 49개 브랜드 그리드
export default function PortfolioGrid() {
  const [cat, setCat] = useState<Category>("All");
  const list = cat === "All" ? WORKS : WORKS.filter((w) => w.cat === cat);

  const chip = (active: boolean): CSSProperties => ({
    borderRadius: 100,
    padding: "11px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .25s",
    background: active ? "#101010" : "#fff",
    color: active ? "#fff" : "#101010",
    border: `1px solid ${active ? "#101010" : "#e0e0dc"}`,
  });

  const cover = (img: string): CSSProperties => ({
    aspectRatio: "4 / 3",
    borderRadius: 14,
    padding: "26px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    color: "#fff",
    textShadow: "0 1px 14px rgba(0,0,0,.35)",
    backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,.42) 100%),url(${cdnImg(img)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "30px 0 20px" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} style={chip(c === cat)}>
            {c}
          </button>
        ))}
      </div>
      <p style={{ margin: "0 0 40px", fontSize: 13.5, color: "var(--muted)" }}>{list.length}개 프로젝트</p>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "30px 22px" }}>
        {list.map((w) => (
          <div key={w.name}>
            <div style={cover(w.img)}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".22em", opacity: 0.55 }}>
                {catEn[w.cat]}
              </span>
              <span
                style={{
                  fontSize: "clamp(26px,2.6vw,38px)",
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                  lineHeight: 1.15,
                  textWrap: "pretty" as CSSProperties["textWrap"],
                }}
              >
                {w.name}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 15, gap: 12 }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>{w.name}</span>
              <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>{w.cat}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{w.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
