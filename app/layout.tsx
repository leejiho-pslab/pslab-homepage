import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "P.S.LAB — 문제 해결 연구소",
    template: "%s — P.S.LAB",
  },
  description:
    "16년차 온라인 종합광고대행사 P.S.LAB. 퍼포먼스 마케팅·브랜딩 컨설팅·콘텐츠 제작과 SNS 채널 자동화 솔루션 ALWAYS ON으로 브랜드의 문제를 풀고 성과로 증명합니다.",
  keywords: ["P.S.LAB", "온라인 광고대행사", "퍼포먼스 마케팅", "브랜딩 컨설팅", "SNS 자동화", "ALWAYS ON"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "P.S.LAB",
    title: "P.S.LAB — 문제 해결 연구소",
    description: "16년차 온라인 종합광고대행사 · SNS 채널 자동화 솔루션 ALWAYS ON 운영사",
  },
  icons: { icon: "/logo.jpg" },
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
      <body>{children}</body>
    </html>
  );
}
