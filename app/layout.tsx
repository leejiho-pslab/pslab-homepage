import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SITE_GRAPH } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "P.S.LAB — 문제 해결 연구소 | 온라인 종합광고대행사",
    template: "%s — P.S.LAB",
  },
  description:
    "16년차 온라인 종합광고대행사 P.S.LAB(문제 해결 연구소). 네이버·구글·메타 퍼포먼스 마케팅, 브랜딩 컨설팅, 콘텐츠·영상 제작과 SNS 채널 자동화 솔루션 ALWAYS ON으로 브랜드의 문제를 풀고 성과로 증명합니다.",
  applicationName: "P.S.LAB",
  authors: [{ name: "P.S.LAB" }],
  creator: "P.S.LAB",
  publisher: "P.S.LAB",
  keywords: [
    "P.S.LAB",
    "pslab",
    "피에스랩",
    "문제 해결 연구소",
    "문제해결연구소",
    "온라인 광고대행사",
    "종합광고대행사",
    "퍼포먼스 마케팅",
    "브랜딩 컨설팅",
    "마케팅 대행",
    "SNS 자동화",
    "ALWAYS ON",
    "얼웨이즈온",
    "올웨이즈온",
    "always on",
    "네이버 광고 대행",
    "구글 광고 대행",
    "메타 광고 대행",
    "콘텐츠 마케팅",
    "이커머스 마케팅",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: "P.S.LAB",
    title: "P.S.LAB — 문제 해결 연구소 | 온라인 종합광고대행사",
    description:
      "16년차 온라인 종합광고대행사. 퍼포먼스 마케팅·브랜딩 컨설팅·콘텐츠 제작 + SNS 채널 자동화 솔루션 ALWAYS ON.",
  },
  twitter: {
    card: "summary_large_image",
    title: "P.S.LAB — 문제 해결 연구소",
    description: "16년차 온라인 종합광고대행사 · SNS 채널 자동화 솔루션 ALWAYS ON 운영사",
  },
  formatDetection: { telephone: true, email: true, address: false },
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  verification: {
    other: { "naver-site-verification": "db90dcca9a3181a5224e87e8687a596c6c02ad82" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&display=swap" rel="stylesheet" />
        <link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet" />
        {/* JS 비활성 환경(일부 크롤러)에서도 콘텐츠가 보이도록 */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <JsonLd data={SITE_GRAPH} />
        {children}
      </body>
    </html>
  );
}
