// 온라인 명함 · vCard 공통 데이터 (인쇄 명함과 동일한 정보원)
import { SITE } from "./site";

export const CARD = {
  name: "이지호",
  title: "소장",
  org: "P.S.LAB",
  orgFull: "P.S.LAB 문제 해결 연구소",
  role: "16년차 온라인 종합광고대행사 · ALWAYS ON 운영사",
  phone: "010-9929-5736",
  phoneIntl: "+82-10-9929-5736",
  email: "ceo@pslab.ai.kr",
  site: "pslab.ai.kr",
  siteUrl: SITE.url,
  instagram: "_pslab",
  instagramUrl: "https://www.instagram.com/_pslab",
  youtubeUrl: "https://www.youtube.com/@pslab2026",
  threadsUrl: "https://www.threads.com/@_pslab",
  url: `${SITE.url}/card`,
} as const;

// RFC 6350(vCard 3.0) — 아이폰·안드로이드 연락처 앱이 모두 인식하는 최소 조합.
// 줄바꿈은 반드시 CRLF, 75옥텟 초과 줄은 없도록 짧게 유지한다.
export function vcard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N;CHARSET=UTF-8:${CARD.name};;;;`,
    `FN;CHARSET=UTF-8:${CARD.name}`,
    `ORG;CHARSET=UTF-8:${CARD.orgFull}`,
    `TITLE;CHARSET=UTF-8:${CARD.title}`,
    `TEL;TYPE=CELL,VOICE:${CARD.phoneIntl}`,
    `EMAIL;TYPE=INTERNET,WORK:${CARD.email}`,
    `URL:${CARD.siteUrl}`,
    `X-SOCIALPROFILE;TYPE=instagram:${CARD.instagramUrl}`,
    `NOTE;CHARSET=UTF-8:${CARD.role}`,
    "END:VCARD",
  ];
  return lines.join("\r\n") + "\r\n";
}
