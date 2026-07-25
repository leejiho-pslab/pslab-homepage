import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";
import { getAllArticles } from "@/lib/magazine";

// 발행일이 지난 글이 자동 공개되도록 1시간마다 재생성
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Magazine — 마케팅 & 트렌드",
  description:
    "P.S.LAB 마케팅 & 트렌드 매거진. SNS 채널 운영, 콘텐츠 자동화(ALWAYS ON·얼웨이즈온), 네이버·구글 SEO, 인스타그램·유튜브·스레드 실전 노하우를 주 3회 발행합니다.",
  keywords: ["마케팅 트렌드", "SNS 마케팅", "콘텐츠 마케팅", "SNS 자동화", "얼웨이즈온", "ALWAYS ON", "마케팅 매거진", "P.S.LAB"],
  alternates: { canonical: "/magazine" },
  openGraph: { title: "Magazine — P.S.LAB 마케팅 & 트렌드", description: "SNS 운영·콘텐츠 자동화·SEO 실전 노하우, 주 3회 발행.", url: "/magazine" },
};

function fmt(d: string) {
  const [y, m, day] = d.split("-");
  return `${y}. ${Number(m)}. ${Number(day)}.`;
}

export default function MagazinePage() {
  const articles = getAllArticles();
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "홈", path: "/" }, { name: "Magazine", path: "/magazine" }])} />
      <Header active="/magazine" />

      {/* 히어로 */}
      <section className="pad-sec" style={{ padding: "200px 40px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" className="eyebrow" style={{ margin: "0 0 26px" }}>MARKETING & TREND MAGAZINE</Reveal>
        <h1 style={{ margin: 0, fontSize: "clamp(40px,5.5vw,84px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.03em" }}>
          <Reveal as="span" style={{ display: "block" }}>마케팅 &amp; 트렌드</Reveal>
        </h1>
        <Reveal as="p" delay={160} style={{ margin: "30px 0 0", maxWidth: 620, fontSize: 17, lineHeight: 1.75, color: "var(--sub)" }}>
          SNS 채널 운영, 콘텐츠 자동화, 검색 노출까지 — 브랜드 성장에 바로 쓰는 실전 노하우를 주 3회 발행합니다.
        </Reveal>
      </section>

      {/* 아티클 목록 */}
      <section className="pad-sec" style={{ padding: "30px 40px 150px", maxWidth: 1200, margin: "0 auto" }}>
        {articles.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>첫 아티클을 준비 중입니다.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/magazine/${a.slug}`}
                className="mag-row"
                style={{ display: "block", padding: "34px 8px", borderTop: "1px solid var(--border)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", background: "#101010", color: "#fff", borderRadius: 100, padding: "4px 12px" }}>
                    {a.category}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--hint)", fontFamily: "var(--font-mono)" }}>{fmt(a.date)}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.3 }}>
                  {a.title}
                </h2>
                <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.7, color: "var(--muted)", maxWidth: 760 }}>{a.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
