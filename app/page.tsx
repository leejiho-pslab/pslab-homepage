import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealLink from "@/components/RevealLink";
import CountUp from "@/components/CountUp";
import HeroVideo from "@/components/HeroVideo";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { HERO_VIDEO, AO_VIDEO } from "@/lib/assets";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/works";
import { CHANNELS, BROCHURE } from "@/lib/site";
import { getAllArticles } from "@/lib/magazine";

// 매거진 최신 글이 홈에 자동 반영되도록 1시간마다 재생성
export const revalidate = 3600;

const SERVICES = [
  { no: "01", title: "퍼포먼스 마케팅", desc: "네이버·구글·메타 광고 운영과 매출 중심 최적화" },
  { no: "02", title: "브랜딩 컨설팅", desc: "15년+ 이커머스 노하우 기반 맞춤 성장 전략" },
  { no: "03", title: "콘텐츠 · 영상 · 디자인", desc: "전담 스튜디오가 채널별 콘텐츠를 일관되게 완성" },
];

const AO_PROMISES = [
  { no: "01", title: "안 올려도 올라갑니다", desc: "매일 자동 발행" },
  { no: "02", title: "멈추지 않습니다", desc: "24시간 자동 운영" },
  { no: "03", title: "지금 시작합니다", desc: "세팅 즉시 가동" },
];

export default function Home() {
  const latest = getAllArticles().slice(0, 3);
  return (
    <main>
      <Header />

      {/* 히어로 */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <HeroVideo
          src={HERO_VIDEO}
          overlay="linear-gradient(180deg,rgba(251,251,250,.25) 0%,rgba(251,251,250,0) 35%,rgba(251,251,250,.88) 88%,#fbfbfa 100%)"
          factor={0.28}
          scale
        />
        <div className="pad-sec" style={{ position: "relative", width: "100%", padding: "0 40px 72px", display: "flex", flexDirection: "column", gap: 26 }}>
          <Reveal as="p" style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, letterSpacing: ".32em", color: "#101010" }}>
            P.S.LAB — 문제 해결 연구소
          </Reveal>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(48px,7.5vw,116px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em" }}>
            <Reveal as="span" delay={80} className="shine-text" style={{ display: "block" }}>함께 문제를</Reveal>
            <Reveal as="span" delay={200} className="shine-text" style={{ display: "block" }}>해결합시다.</Reveal>
          </h1>
          <Reveal delay={300}>
            <a
              href={BROCHURE.href}
              download={BROCHURE.filename}
              className="btn btn-cta-dark"
              style={{ padding: "14px 30px", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              ALWAYS ON 솔루션 소개서 <span aria-hidden>↓</span>
            </a>
          </Reveal>
          <Reveal delay={340} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderTop: "1px solid rgba(16,16,16,.18)", paddingTop: 22 }}>
            <p style={{ margin: 0, fontSize: 17, color: "var(--sub)", fontWeight: 500 }}>16년차 온라인 종합광고대행사 · ALWAYS ON 운영사</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)", letterSpacing: ".14em", fontWeight: 600 }}>
              SCROLL
              <span style={{ display: "block", width: 1, height: 26, background: "#101010", animation: "scrollcue 1.8s infinite" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 스테이트먼트 */}
      <section className="pad-sec" style={{ padding: "180px 40px 150px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" className="eyebrow" style={{ margin: "0 0 34px" }}>WHO WE ARE</Reveal>
        <h2 style={{ margin: 0, fontSize: "clamp(30px,4vw,54px)", fontWeight: 700, lineHeight: 1.42, letterSpacing: "-.02em", textWrap: "pretty" }}>
          <Reveal as="span" style={{ display: "block" }}>온라인 마케팅·컨설팅 특화 대행사.</Reveal>
          <Reveal as="span" delay={120} style={{ display: "block", color: "var(--hint)" }}>브랜드의 문제를 풀고, 성과로 증명합니다.</Reveal>
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", marginTop: 110 }}>
          <Reveal style={{ background: "var(--bg)", padding: "44px 36px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 64, fontWeight: 800, letterSpacing: "-.02em" }}><CountUp to={16} />년+</div>
            <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 15 }}>온라인 마케팅 경력</p>
          </Reveal>
          <Reveal delay={120} style={{ background: "var(--bg)", padding: "44px 36px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 64, fontWeight: 800, letterSpacing: "-.02em" }}><CountUp to={8} />개</div>
            <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 15 }}>전문 산업군 커버리지</p>
          </Reveal>
          <Reveal delay={240} style={{ background: "var(--bg)", padding: "44px 36px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 64, fontWeight: 800, letterSpacing: "-.02em" }}>통합</div>
            <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 15 }}>기획 · 운영 · 제작 원스톱</p>
          </Reveal>
        </div>
      </section>

      {/* 서비스 */}
      <section className="pad-sec" style={{ padding: "0 40px 170px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" className="eyebrow" style={{ margin: "0 0 18px" }}>SERVICES</Reveal>
        <Reveal as="h2" style={{ margin: "0 0 60px", fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, letterSpacing: "-.02em" }}>
          무엇을 하는가
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SERVICES.map((s) => (
            <RevealLink key={s.no} href="/about" className="svc-row">
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "var(--hint)" }}>{s.no}</span>
              <span style={{ fontSize: "clamp(24px,2.6vw,36px)", fontWeight: 800, letterSpacing: "-.02em" }}>{s.title}</span>
              <span className="svc-desc" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</span>
              <span className="svc-arrow" style={{ fontSize: 22 }}>→</span>
            </RevealLink>
          ))}
        </div>
      </section>

      {/* 포트폴리오 프리뷰 */}
      <section style={{ padding: "0 0 170px", overflow: "hidden" }}>
        <div className="pad-sec" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <Reveal as="p" className="eyebrow" style={{ margin: "0 0 18px" }}>PORTFOLIO</Reveal>
            <Reveal as="h2" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, letterSpacing: "-.02em" }}>
              산업을 가리지 않고,<br />성과로 증명했습니다
            </Reveal>
          </div>
          <RevealLink href="/portfolio" className="btn btn-outline-dark" style={{ flexShrink: 0, padding: "14px 30px", fontSize: 15 }}>
            전체 보기 →
          </RevealLink>
        </div>
        <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ display: "inline-flex", gap: 14, animation: "marquee 32s linear infinite", paddingRight: 14 }}>
              {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14, border: "1px solid var(--border2)", borderRadius: 100, padding: "16px 34px", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, letterSpacing: ".02em", background: "#fff" }}>
                  {ind}
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#101010" }} />
                </span>
              ))}
            </div>
          </div>
        </div>
        <PortfolioCarousel />
      </section>

      {/* ALWAYS ON 다크 섹션 */}
      <section className="dark" style={{ position: "relative", background: "#0c0c0c", color: "#f5f5f2", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
          <HeroVideo
            src={AO_VIDEO}
            overlay="linear-gradient(180deg,#0c0c0c 0%,rgba(12,12,12,.35) 40%,rgba(12,12,12,.35) 60%,#0c0c0c 100%)"
            factor={0}
            scale={false}
          />
        </div>
        <div className="pad-sec" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "170px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Reveal as="span" style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", color: "var(--d-muted)" }}>SNS 채널 자동화 솔루션</Reveal>
            <Reveal as="span" style={{ border: "1px solid #3a3a37", borderRadius: 100, padding: "5px 14px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".18em", display: "inline-flex", alignItems: "center", gap: 8 }}>
              LIVE<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5f5f2", animation: "pulse 1.6s infinite" }} />
            </Reveal>
          </div>
          <h2 style={{ margin: "30px 0 0", fontSize: "clamp(44px,6.5vw,96px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-.03em" }}>
            <Reveal as="span" style={{ display: "block", fontFamily: "var(--font-mono)" }}>ALWAYS ON</Reveal>
            <Reveal as="span" delay={140} style={{ display: "block", color: "var(--d-muted)", fontSize: ".52em", fontWeight: 700, marginTop: 22, letterSpacing: "-.02em" }}>당신의 브랜드는, 자는 동안에도 자랍니다</Reveal>
          </h2>
          <Reveal delay={220} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 44 }}>
            {CHANNELS.map((ch) => (
              <span key={ch} style={{ border: "1px solid #3a3a37", borderRadius: 100, padding: "10px 22px", fontSize: 14, fontWeight: 600, color: "#d8d8d4" }}>{ch}</span>
            ))}
          </Reveal>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--d-border)", border: "1px solid var(--d-border)", marginTop: 70 }}>
            {AO_PROMISES.map((p, i) => (
              <Reveal key={p.no} delay={i * 120} style={{ background: "var(--d-card)", padding: "38px 32px" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, color: "#666", fontSize: 13 }}>{p.no}</p>
                <p style={{ margin: "14px 0 8px", fontSize: 21, fontWeight: 800 }}>{p.title}</p>
                <p style={{ margin: 0, color: "var(--d-muted)", fontSize: 14.5, lineHeight: 1.6 }}>{p.desc}</p>
              </Reveal>
            ))}
          </div>
          <RevealLink href="/always-on" className="btn btn-cta-light" style={{ marginTop: 60, padding: "18px 44px", fontSize: 16 }}>
            솔루션 자세히 보기 →
          </RevealLink>
        </div>
      </section>

      {/* 매거진 최신 글 */}
      {latest.length > 0 && (
        <section className="pad-sec" style={{ padding: "150px 40px 120px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <Reveal as="p" className="eyebrow" style={{ margin: "0 0 18px" }}>MAGAZINE</Reveal>
              <Reveal as="h2" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,52px)", fontWeight: 700, letterSpacing: "-.02em" }}>
                마케팅 &amp; 트렌드
              </Reveal>
            </div>
            <RevealLink href="/magazine" className="btn btn-outline-dark" style={{ flexShrink: 0, padding: "12px 26px", fontSize: 14 }}>
              전체 보기 →
            </RevealLink>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {latest.map((a) => (
              <Link key={a.slug} href={`/magazine/${a.slug}`} className="mag-row" style={{ display: "block", padding: "26px 8px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, color: "var(--hint)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{a.date.replace(/-/g, ". ")}.</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>{a.category}</span>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: "clamp(17px,2vw,21px)", fontWeight: 800, letterSpacing: "-.01em", lineHeight: 1.4 }}>{a.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 엔딩 CTA + 푸터 — 다크 피날레 */}
      <section className="dark" style={{ position: "relative", background: "#0c0c0c", color: "#f5f5f2", overflow: "hidden" }}>
        {/* 떠다니는 글로우 배경 */}
        <div className="cta-blob cta-blob-a" />
        <div className="cta-blob cta-blob-b" />

        {/* 거대 아웃라인 텍스트 마퀴 */}
        <div style={{ borderBottom: "1px solid #1a1a18", padding: "26px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-flex", animation: "marquee 26s linear infinite" }}>
            {[0, 1].map((k) => (
              <span
                key={k}
                className="outline-text"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "clamp(44px,6vw,84px)", letterSpacing: ".04em", paddingRight: 40 }}
              >
                SOLVE YOUR PROBLEM&nbsp;✳&nbsp;P.S.LAB&nbsp;✳&nbsp;SOLVE YOUR PROBLEM&nbsp;✳&nbsp;ALWAYS ON&nbsp;✳&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="pad-sec" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "130px 40px 110px", textAlign: "center" }}>
          <Reveal as="p" style={{ margin: "0 0 22px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".32em", color: "var(--d-muted)" }}>PROBLEM SOLVING LAB</Reveal>
          <Reveal as="h2" delay={80} className="shine-text-dark" style={{ margin: 0, fontSize: "clamp(32px,4.6vw,64px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.18 }}>
            어떤 문제를<br />마주하고 계신가요?
          </Reveal>
          <Reveal as="p" delay={200} style={{ margin: "24px 0 0", fontSize: 16, lineHeight: 1.8, color: "var(--d-muted)", textWrap: "pretty" }}>
            막막한 고민도 좋습니다. 들려주시는 순간, 연구소의 일이 시작됩니다.
          </Reveal>
          <Reveal delay={300} style={{ marginTop: 44, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-cta-light cta-glow" style={{ padding: "19px 52px", fontSize: 17 }}>
              문제 들려주기 →
            </Link>
            <a href="mailto:CEO@PSLAB.AI.KR" className="btn" style={{ padding: "18px 34px", fontSize: 15, border: "1px solid #3a3a37", color: "#f5f5f2" }}>
              ✉ CEO@PSLAB.AI.KR
            </a>
          </Reveal>
          <Reveal as="p" delay={400} style={{ margin: "26px 0 0", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--d-muted)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)", animation: "pulse 1.6s infinite" }} />
            지금 문의하면 24시간 안에 회신드립니다
          </Reveal>
        </div>
        <Footer dark />
      </section>
    </main>
  );
}
