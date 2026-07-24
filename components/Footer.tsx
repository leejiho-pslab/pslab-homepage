import Link from "next/link";
import { SITE, NAV, SOCIAL } from "@/lib/site";

export default function Footer({
  dark,
  wide,
  tag = "온라인 종합광고대행사",
}: {
  dark?: boolean;
  wide?: boolean;
  tag?: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className={`footer${wide ? " wide" : ""}${dark ? " dark" : ""}`}>
      <div className="f-top">
        <div>
          <span className="f-name">P.S.LAB</span>
          <span className="f-tag">피에스랩 · 문제 해결 연구소 · {tag}</span>
        </div>
        <nav className="f-nav" aria-label="푸터 내비게이션">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact">문의하기</Link>
        </nav>
      </div>
      <p className="f-desc">
        P.S.LAB(문제 해결 연구소)는 16년차 온라인 종합광고대행사입니다. 네이버·구글·메타 퍼포먼스 마케팅, 브랜딩 컨설팅,
        콘텐츠·영상 제작과 SNS 채널 자동화 솔루션 ALWAYS ON으로 브랜드의 문제를 풀고 성과로 증명합니다.
      </p>
      <div className="f-social">
        {SOCIAL.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <div className="f-contact">
        <span>{SITE.contact.manager}</span>
        <a href={`tel:${SITE.contact.phone}`}>{SITE.contact.phone}</a>
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
        <span>© {year} P.S.LAB</span>
      </div>
    </footer>
  );
}
