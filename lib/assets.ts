// 외부 자산 URL을 한 곳에서 관리 — 자체 호스팅으로 이관할 때 이 파일만 고치면 됩니다.
//
// [배경 영상] 현재 Higgsfield AI가 생성한 CloudFront URL을 그대로 참조합니다.
// 방문자 브라우저에서는 정상 재생되지만, URL 만료 가능성이 있어 자체 호스팅을 권장합니다.
// 이관 방법: 영상 2개를 다운로드해 /public/videos/ 에 넣고 아래 값을 "/videos/hero.mp4" 등으로 교체.
export const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EsYKei5ji5vSBZVwsAwggxd0R9/hf_20260724_122437_f3c6fff7-9d1f-4c01-9ee3-9e45a4ad9553.mp4";
export const AO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EsYKei5ji5vSBZVwsAwggxd0R9/hf_20260724_121014_d2339fdf-6dde-4071-89d7-d9048a27a27b.mp4";

// [포트폴리오 이미지] 현재 자사 운영 CDN(imweb)을 참조합니다. 자체 호스팅 이관 시 IMWEB_BASE만 교체.
export const IMWEB_BASE = "https://cdn.imweb.me/thumbnail/";
export const cdnImg = (p: string) => (p.startsWith("http") ? p : IMWEB_BASE + p);
