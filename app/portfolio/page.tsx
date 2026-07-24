import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealLink from "@/components/RevealLink";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "뷰티·식품·패션·리테일·펫·B2B까지 — P.S.LAB이 브랜딩과 퍼포먼스를 함께 운영한 49개 브랜드 레퍼런스.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Header active="/portfolio" />

      {/* 히어로 */}
      <section className="pad-sec" style={{ padding: "220px 40px 70px", maxWidth: 1240, margin: "0 auto" }}>
        <Reveal as="p" className="eyebrow" style={{ margin: "0 0 30px" }}>PORTFOLIO &amp; REFERENCE</Reveal>
        <h1 style={{ margin: 0, fontSize: "clamp(44px,6.5vw,96px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.03em" }}>
          <Reveal as="span" style={{ display: "block" }}>산업을 가리지 않고,</Reveal>
          <Reveal as="span" delay={140} style={{ display: "block" }}>성과로 증명했습니다</Reveal>
        </h1>
        <Reveal as="p" delay={280} style={{ margin: "40px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.7, color: "var(--sub)" }}>
          뷰티부터 식품·패션·리테일·펫·B2B 플랫폼까지, 브랜딩과 퍼포먼스를 함께 운영했습니다. 대기업 브랜드부터 신규 런칭까지 폭넓은 클라이언트 경험이 자산입니다.
        </Reveal>
      </section>

      {/* 필터 · 그리드 */}
      <section className="pad-sec" style={{ padding: "0 40px 150px", maxWidth: 1240, margin: "0 auto" }}>
        <PortfolioGrid />
        <Reveal as="p" style={{ margin: "70px 0 0", textAlign: "center", fontSize: 15, color: "var(--muted)" }}>
          ＋ many — 캠페인 상세 자료와 크리에이티브는 문의 시 회사소개서로 전달드립니다.
        </Reveal>
      </section>

      {/* CTA + 푸터 (다크) */}
      <section className="dark" style={{ background: "#0c0c0c", color: "#f5f5f2" }}>
        <div className="pad-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "130px 40px 90px", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: 0, fontSize: "clamp(36px,5vw,72px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.12 }}>
            다음 성공 사례는<br />당신의 브랜드입니다
          </Reveal>
          <RevealLink href="/contact" delay={140} className="btn btn-cta-light" style={{ marginTop: 46, padding: "20px 52px", fontSize: 17 }}>프로젝트 문의하기</RevealLink>
        </div>
        <Footer dark wide />
      </section>
    </main>
  );
}
