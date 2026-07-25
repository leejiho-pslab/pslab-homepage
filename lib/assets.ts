// 외부 자산 URL을 한 곳에서 관리 — 자체 호스팅으로 이관할 때 이 파일만 고치면 됩니다.
//
// [배경 영상] 현재 Higgsfield AI가 생성한 CloudFront URL을 그대로 참조합니다.
// 방문자 브라우저에서는 정상 재생되지만, URL 만료 가능성이 있어 자체 호스팅을 권장합니다.
// 이관 방법: 영상 2개를 다운로드해 /public/videos/ 에 넣고 아래 값을 "/videos/hero.mp4" 등으로 교체.
// 2026-07-25 리뉴얼: IBK CF 레퍼런스 문법 × 기존 룩북 소스 믹스 (AI 모델 다각도 + 로고 리빌, 19s 1080p)
export const HERO_VIDEO =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3EsYKei5ji5vSBZVwsAwggxd0R9/47072c8f-aeb0-4f98-8d8f-811f2b8befec.mp4";
export const AO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EsYKei5ji5vSBZVwsAwggxd0R9/hf_20260724_121014_d2339fdf-6dde-4071-89d7-d9048a27a27b.mp4";

// [포트폴리오 이미지] 현재 자사 운영 CDN(imweb)을 참조합니다. 자체 호스팅 이관 시 IMWEB_BASE만 교체.
export const IMWEB_BASE = "https://cdn.imweb.me/thumbnail/";
export const cdnImg = (p: string) => (p.startsWith("http") ? p : IMWEB_BASE + p);
