import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CardActions from "@/components/CardActions";
import { CARD } from "@/lib/card";
import { SITE, BROCHURE } from "@/lib/site";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "이지호 소장 명함",
  description:
    "P.S.LAB 문제 해결 연구소 이지호 소장 온라인 명함. 전화·이메일·홈페이지·인스타그램 바로가기와 연락처 저장(vCard)을 제공합니다.",
  keywords: ["이지호 소장", "P.S.LAB 명함", "문제 해결 연구소 이지호", "pslab 이지호", "온라인 명함"],
  alternates: { canonical: "/card" },
  openGraph: {
    title: "이지호 소장 — P.S.LAB 문제 해결 연구소",
    description: "16년차 온라인 종합광고대행사 P.S.LAB · ALWAYS ON 운영사",
    url: "/card",
  },
};

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CARD.name,
  jobTitle: CARD.title,
  telephone: CARD.phoneIntl,
  email: CARD.email,
  url: CARD.url,
  image: `${SITE.url}/logo.jpg`,
  worksFor: { "@type": "Organization", name: CARD.orgFull, url: SITE.url },
  sameAs: [CARD.instagramUrl, CARD.youtubeUrl, CARD.threadsUrl],
};

// 아이콘은 이모지 대신 단색 선 아이콘으로 — 기기별로 색·모양이 달라지지 않게
const ICON: Record<string, React.ReactNode> = {
  phone: <path d="M4.5 3h3l1.5 4-2 1.3a11 11 0 0 0 4.7 4.7L13 11l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A13.5 13.5 0 0 1 3 4.7 1.5 1.5 0 0 1 4.5 3Z" />,
  sms: <path d="M3.5 4.5h13v9h-7l-3.5 3v-3h-2.5v-9Z" />,
  mail: <><path d="M3 5h14v10H3z" /><path d="m3.5 5.8 6.5 5 6.5-5" /></>,
  web: <><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3a13 13 0 0 1 0 14 13 13 0 0 1 0-14Z" /></>,
  insta: <><rect x="3.4" y="3.4" width="13.2" height="13.2" rx="4" /><circle cx="10" cy="10" r="3.3" /><circle cx="14" cy="6" r="1" fill="currentColor" stroke="none" /></>,
};

const LINKS = [
  { href: `tel:${CARD.phoneIntl}`, label: "전화 걸기", sub: CARD.phone, icon: "phone" },
  { href: `sms:${CARD.phoneIntl}`, label: "문자 보내기", sub: CARD.phone, icon: "sms" },
  { href: `mailto:${CARD.email}`, label: "이메일", sub: CARD.email, icon: "mail" },
  { href: SITE.url, label: "홈페이지", sub: CARD.site, icon: "web", external: true },
  { href: CARD.instagramUrl, label: "인스타그램", sub: `@${CARD.instagram}`, icon: "insta", external: true },
];

export default function CardPage() {
  return (
    <main className="card-page">
      <JsonLd data={PERSON} />
      <JsonLd data={breadcrumb([{ name: "홈", path: "/" }, { name: "명함", path: "/card" }])} />

      <article className="card-sheet">
        {/* 앞면 헤더 — 인쇄 명함 뒷면과 같은 검정 브랜드 면 */}
        <header className="card-hero">
          {/* img 는 CSS currentColor 를 상속받지 못하므로 흰색이 칠해진 전용 파일을 쓴다 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-white.svg" alt="P.S.LAB 문제 해결 연구소" className="card-hero-logo" />
          <p className="card-hero-line">BRAND · PERFORMANCE · CONTENT · ALWAYS ON</p>
        </header>

        <section className="card-id">
          <h1>
            {CARD.name}
            <span>{CARD.title}</span>
          </h1>
          <p className="card-org">{CARD.orgFull}</p>
          <p className="card-role">{CARD.role}</p>

          <a href="/api/vcard" className="card-btn card-btn-solid" download>
            연락처 저장
          </a>
          <CardActions />
        </section>

        <nav className="card-links" aria-label="연락 수단">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <svg className="card-link-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {ICON[l.icon]}
              </svg>
              <span className="card-link-txt">
                <b>{l.label}</b>
                <i>{l.sub}</i>
              </span>
              <span className="card-link-arw" aria-hidden>
                ↗
              </span>
            </a>
          ))}
        </nav>

        <section className="card-cta">
          <p>브랜드의 문제, 같이 풀어볼까요?</p>
          <div>
            <Link href="/contact" className="card-btn card-btn-solid">
              프로젝트 문의
            </Link>
            <a href={BROCHURE.href} className="card-btn card-btn-ghost" download={BROCHURE.filename}>
              {BROCHURE.label}
            </a>
          </div>
        </section>

        <footer className="card-foot">
          <Link href="/">pslab.ai.kr</Link>
          <span>© {new Date().getFullYear()} P.S.LAB</span>
        </footer>
      </article>
    </main>
  );
}
