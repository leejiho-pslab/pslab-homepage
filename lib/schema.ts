// 구조화 데이터(JSON-LD) — 구글/AI 검색이 회사를 정확히 이해하도록.
// "실제로 존재·표시되는 정보만" 마크업 (구글 정책).
import { SITE } from "./site";

const BASE = SITE.url;

export const ORG = {
  "@type": "Organization",
  "@id": `${BASE}/#org`,
  name: "P.S.LAB",
  alternateName: ["문제 해결 연구소", "문제해결연구소", "피에스랩", "PSLAB", "pslab", "P.S.LAB"],
  url: BASE,
  logo: `${BASE}/logo.jpg`,
  image: `${BASE}/logo.jpg`,
  sameAs: [
    "https://www.instagram.com/_pslab",
    "https://www.youtube.com/@pslab2026",
    "https://www.threads.com/@_pslab",
  ],
  description:
    "16년차 온라인 종합광고대행사. 퍼포먼스 마케팅·브랜딩 컨설팅·콘텐츠 제작과 SNS 채널 자동화 솔루션 ALWAYS ON을 제공합니다.",
  slogan: "함께 문제를 해결합시다",
  foundingDate: "2010",
  founder: { "@type": "Person", name: "이지호" },
  areaServed: { "@type": "Country", name: "대한민국" },
  knowsAbout: [
    "퍼포먼스 마케팅",
    "브랜딩 컨설팅",
    "SNS 채널 자동화",
    "콘텐츠 마케팅",
    "영상 제작",
    "온라인 광고대행",
    "네이버 광고",
    "구글 광고",
    "메타 광고",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-9929-5736",
    email: "CEO@PSLAB.AI.KR",
    contactType: "sales",
    areaServed: "KR",
    availableLanguage: ["Korean"],
  },
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "P.S.LAB",
  alternateName: ["문제 해결 연구소", "문제해결연구소", "피에스랩", "pslab"],
  inLanguage: "ko-KR",
  publisher: { "@id": `${BASE}/#org` },
};

// 사이트 전역 그래프 (레이아웃에 삽입)
export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [ORG, WEBSITE],
};

// ALWAYS ON 서비스 스키마 (always-on 페이지)
export const AO_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ALWAYS ON",
  alternateName: ["얼웨이즈온", "올웨이즈온", "Always On", "always on"],
  serviceType: "SNS 채널 자동화 솔루션",
  provider: { "@id": `${BASE}/#org` },
  areaServed: { "@type": "Country", name: "대한민국" },
  url: `${BASE}/always-on`,
  description:
    "ALWAYS ON(얼웨이즈온)은 인스타그램·네이버 블로그·구글 블로그·스레드·유튜브 5개 채널을 매일 자동 발행하는 P.S.LAB의 SNS 채널 자동화 솔루션입니다. 조사·기획·제작·발행을 자동화해 브랜드 콘텐츠 자산을 매일 쌓습니다.",
};

// 빵부스러기(BreadcrumbList) 생성기
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}
