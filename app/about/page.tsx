import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealLink from "@/components/RevealLink";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "P.S.LAB은 16년차 온라인 마케팅·컨설팅 특화 종합광고대행사입니다. 진단·전략·실행·성장의 원스톱 프로세스로 브랜드의 문제를 풀고 지속 가능한 성장을 만듭니다.",
  keywords: ["P.S.LAB 소개", "온라인 마케팅 대행사", "브랜딩 컨설팅", "광고대행사 회사소개", "이지호 소장"],
  alternates: { canonical: "/about" },
  openGraph: { title: "About — P.S.LAB", description: "16년차 온라인 마케팅·컨설팅 특화 대행사. 진단·전략·실행·성장 원스톱.", url: "/about" },
};

const SERVICES = [
  {
    no: "01",
    title: "퍼포먼스 마케팅",
    desc: "네이버·구글·메타·SNS 채널 광고 운영과 매출 중심의 캠페인 최적화.",
    items: ["광고 채널 운영 및 데이터 분석", "마케팅 전략 수립 · 목표 설정", "자사몰·플랫폼 매출 증대 캠페인"],
  },
  {
    no: "02",
    title: "브랜딩 컨설팅",
    desc: "15년 이상의 이커머스 컨설팅 노하우로 브랜드 맞춤형 성장 전략을 수립합니다.",
    items: ["매출·이익률 개선 체질 컨설팅", "신규 런칭 · 리브랜딩 통합 전략", "시장 확대 기반의 지속 성장 설계"],
  },
  {
    no: "03",
    title: "콘텐츠 · 영상 · 디자인",
    desc: "전담 스튜디오의 영상·디자인 제작으로 채널별 콘텐츠를 일관되게 완성합니다.",
    items: ["비주얼 기획 · 화보 촬영", "프로모션 · 브랜딩 영상 제작", "SNS 콘텐츠 기획 및 제작"],
  },
];

const STEPS = [
  { no: "STEP 1", title: "진단", desc: "브랜드·시장·경쟁사를 분석해 진짜 문제를 정의합니다." },
  { no: "STEP 2", title: "전략", desc: "브랜드에 최적화된 맞춤 전략을 설계하고 제안합니다." },
  { no: "STEP 3", title: "실행", desc: "기획·운영·제작 원스톱으로 캠페인을 집행합니다." },
  { no: "STEP 4", title: "성장", desc: "데이터로 검증하고 방향을 다듬어 지속 성장을 만듭니다." },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "홈", path: "/" }, { name: "About", path: "/about" }])} />
      <Header active="/about" />

      {/* 히어로 */}
      <section className="pad-sec" style={{ padding: "220px 40px 130px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" className="eyebrow" style={{ margin: "0 0 30px" }}>ABOUT P.S.LAB</Reveal>
        <h1 style={{ margin: 0, fontSize: "clamp(44px,6.5vw,96px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.03em" }}>
          <Reveal as="span" style={{ display: "block" }}>&quot;클라이언트의 성장이</Reveal>
          <Reveal as="span" delay={140} style={{ display: "block" }}>곧 우리의 성장&quot;</Reveal>
        </h1>
        <Reveal as="p" delay={280} style={{ margin: "44px 0 0", maxWidth: 680, fontSize: 19, lineHeight: 1.75, color: "var(--sub)" }}>
          P.S.LAB은 16년차 온라인 마케팅·컨설팅 특화 대행사입니다. 다양한 산업군의 클라이언트와 함께 브랜드의 문제를 풀고 실질적인 성과를 만들어왔습니다. 우리는 브랜드에 최적화된 맞춤 전략을 설계하고, 올바른 마케팅을 통해 지속 가능한 성공을 실현합니다.
        </Reveal>
      </section>

      {/* 서비스 상세 */}
      <section className="pad-sec" style={{ padding: "0 40px 150px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-3 grid-tab-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
          {SERVICES.map((s) => (
            <Reveal key={s.no} className="card-lift" style={{ border: "1px solid var(--border)", borderRadius: 16, padding: "44px 34px", background: "#fff" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "var(--hint)" }}>{s.no}</p>
              <h3 style={{ margin: "20px 0 16px", fontSize: 25, fontWeight: 800, letterSpacing: "-.02em" }}>{s.title}</h3>
              <p style={{ margin: "0 0 26px", fontSize: 15.5, lineHeight: 1.7, color: "var(--muted)" }}>{s.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.items.map((it) => (
                  <span key={it} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 600 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#101010", flexShrink: 0 }} />
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 일하는 방식 (다크) */}
      <section className="dark pad-sec" style={{ background: "#0c0c0c", color: "#f5f5f2", padding: "150px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal as="p" style={{ margin: "0 0 18px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", color: "var(--d-muted)" }}>HOW WE WORK</Reveal>
          <Reveal as="h2" style={{ margin: "0 0 70px", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-.02em" }}>함께, 브랜드의 문제를 해결합니다</Reveal>
          <div className="grid-4 grid-tab-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--d-border)", border: "1px solid var(--d-border)" }}>
            {STEPS.map((st) => (
              <Reveal key={st.no} style={{ background: "var(--d-card)", padding: "40px 30px", minHeight: 200 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "#666" }}>{st.no}</p>
                <p style={{ margin: "16px 0 10px", fontSize: 20, fontWeight: 800 }}>{st.title}</p>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--d-muted)" }}>{st.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + 푸터 */}
      <section style={{ background: "var(--bg)" }}>
        <div className="pad-sec" style={{ maxWidth: 1200, margin: "0 auto", padding: "150px 40px 90px", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: 0, fontSize: "clamp(36px,5vw,72px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.12 }}>
            브랜드의 다음 문제,<br />같이 풀어볼까요?
          </Reveal>
          <RevealLink href="/contact" delay={140} className="btn btn-cta-dark" style={{ marginTop: 46, padding: "20px 52px", fontSize: 17 }}>프로젝트 문의하기</RevealLink>
        </div>
        <Footer />
      </section>
    </main>
  );
}
