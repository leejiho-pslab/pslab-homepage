import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";
import { SITE, BROCHURE } from "@/lib/site";
import { getAllArticles, getArticle, parseBlocks, splitBold, type Block } from "@/lib/magazine";

// 발행일이 지난 글이 자동 공개되도록 1시간마다 재생성
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Magazine" };
  return {
    title: a.title,
    description: a.description,
    keywords: [...a.tags, "P.S.LAB", "얼웨이즈온", "ALWAYS ON"],
    alternates: { canonical: `/magazine/${a.slug}` },
    openGraph: { title: a.title, description: a.description, url: `/magazine/${a.slug}`, type: "article" },
  };
}

function fmt(d: string) {
  const [y, m, day] = d.split("-");
  return `${y}. ${Number(m)}. ${Number(day)}.`;
}

function renderText(text: string) {
  return splitBold(text).map((s, i) => (s.bold ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>));
}

function renderBlock(b: Block, i: number) {
  if (b.type === "h2")
    return <h2 key={i} style={{ margin: "44px 0 14px", fontSize: "clamp(21px,2.4vw,27px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.35 }}>{renderText(b.text)}</h2>;
  if (b.type === "h3")
    return <h3 key={i} style={{ margin: "32px 0 10px", fontSize: "clamp(17px,1.9vw,20px)", fontWeight: 800, letterSpacing: "-.01em" }}>{renderText(b.text)}</h3>;
  if (b.type === "quote")
    return (
      <blockquote key={i} style={{ margin: "26px 0", padding: "16px 22px", borderLeft: "3px solid #101010", background: "#f4f4f1", borderRadius: "0 10px 10px 0", fontSize: 16, fontWeight: 600, lineHeight: 1.7 }}>
        {renderText(b.text)}
      </blockquote>
    );
  if (b.type === "ul")
    return (
      <ul key={i} style={{ margin: "14px 0 22px", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
        {b.items.map((it, j) => (
          <li key={j} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--sub)" }}>{renderText(it)}</li>
        ))}
      </ul>
    );
  return <p key={i} style={{ margin: "0 0 18px", fontSize: 16.5, lineHeight: 1.85, color: "var(--sub)" }}>{renderText(b.text)}</p>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const blocks = parseBlocks(a.body);
  const related = getAllArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: "P.S.LAB", url: SITE.url },
    publisher: { "@id": `${SITE.url}/#org` },
    mainEntityOfPage: `${SITE.url}/magazine/${a.slug}`,
    keywords: a.tags.join(", "),
  };

  return (
    <main>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumb([{ name: "홈", path: "/" }, { name: "Magazine", path: "/magazine" }, { name: a.title, path: `/magazine/${a.slug}` }])} />
      <Header active="/magazine" />

      <article className="pad-sec" style={{ padding: "190px 40px 60px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", background: "#101010", color: "#fff", borderRadius: 100, padding: "4px 12px" }}>{a.category}</span>
          <span style={{ fontSize: 13, color: "var(--hint)", fontFamily: "var(--font-mono)" }}>{fmt(a.date)}</span>
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-.03em" }}>{a.title}</h1>
        <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.75, color: "var(--muted)" }}>{a.description}</p>
        <div style={{ borderTop: "1px solid var(--border)", margin: "36px 0 8px" }} />
        {blocks.map(renderBlock)}

        {/* ALWAYS ON 홍보 CTA — 모든 아티클 하단 자동 부착 */}
        <aside className="dark" style={{ marginTop: 56, background: "#0c0c0c", color: "#f5f5f2", borderRadius: 18, padding: "40px 36px" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".26em", color: "var(--d-muted)", display: "flex", alignItems: "center", gap: 8 }}>
            P.S.LAB — SNS 채널 자동화 솔루션
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5f5f2", animation: "pulse 1.6s infinite" }} />
          </p>
          <p style={{ margin: "16px 0 8px", fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", fontFamily: "var(--font-mono)" }}>ALWAYS ON</p>
          <p style={{ margin: "0 0 24px", fontSize: 15, lineHeight: 1.75, color: "#d8d8d4" }}>
            이 글의 실행, 매일 하기 어렵다면 — 얼웨이즈온이 인스타그램·네이버 블로그·구글 블로그·스레드·유튜브 5개 채널을 매일 자동 발행합니다.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/always-on" className="btn btn-cta-light" style={{ padding: "13px 26px", fontSize: 14 }}>솔루션 알아보기 →</Link>
            <a href={BROCHURE.href} download={BROCHURE.filename} className="btn" style={{ padding: "13px 26px", fontSize: 14, border: "1px solid #3a3a37", color: "#f5f5f2" }}>소개서 다운로드 ↓</a>
            <Link href="/contact" className="btn" style={{ padding: "13px 26px", fontSize: 14, border: "1px solid #3a3a37", color: "#f5f5f2" }}>도입 상담</Link>
          </div>
        </aside>

        {/* 관련 글 */}
        {related.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <p className="eyebrow" style={{ margin: "0 0 18px" }}>MORE ARTICLES</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/magazine/${r.slug}`} className="mag-row" style={{ display: "block", padding: "20px 6px", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12.5, color: "var(--hint)", fontFamily: "var(--font-mono)" }}>{fmt(r.date)}</span>
                  <p style={{ margin: "6px 0 0", fontSize: 17, fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.4 }}>{r.title}</p>
                </Link>
              ))}
            </div>
            <Link href="/magazine" style={{ display: "inline-block", marginTop: 26, fontSize: 14.5, fontWeight: 700, borderBottom: "2px solid #101010", paddingBottom: 2 }}>
              매거진 전체 보기 →
            </Link>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
