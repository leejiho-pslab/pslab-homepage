// 외부 자산 URL을 한 곳에서 관리 — 자체 호스팅으로 이관할 때 이 파일만 고치면 됩니다.
//
// [배경 영상] 2026-07-29 자체 호스팅으로 이관 완료 (public/videos/).
// 이전에는 Higgsfield AI가 생성한 CloudFront URL을 직접 참조했는데, 그 URL은
// 만료될 수 있어 어느 날 갑자기 히어로 영상이 폴백(그라데이션)으로 떨어질 위험이
// 있었습니다. 이제 저장소 파일을 서빙하므로 외부 만료의 영향을 받지 않습니다.
//
// 원본(참고용, 재생성·교체 시 출처 추적):
//   hero      = d2ol7oe51mr4n9.cloudfront.net/.../b8d8e29e-9c78-43fb-987e-12f747a86d81.mp4
//   always-on = d8j0ntlcm91z4.cloudfront.net/.../hf_20260724_121014_d2339fdf-....mp4
//
// 영상 교체 방법: 새 mp4 를 public/videos/ 에 같은 이름으로 덮어쓰면 됩니다.
// 2026-07-25 v2: 오프닝 인물 = 20대 한국 여성 인플루언서(힙 크리에이티브 스튜디오, 영어 텍스트만)
// 구성: AI 오프닝/다각도 컷 + 기존 룩북 소스 + SNS 아이콘→로고 리빌 + 필름스트립 (19s 1080p)
export const HERO_VIDEO = "/videos/hero.mp4";
export const AO_VIDEO = "/videos/always-on.mp4";

// [포트폴리오 이미지] 현재 자사 운영 CDN(imweb)을 참조합니다. 자체 호스팅 이관 시 IMWEB_BASE만 교체.
export const IMWEB_BASE = "https://cdn.imweb.me/thumbnail/";
export const cdnImg = (p: string) => (p.startsWith("http") ? p : IMWEB_BASE + p);
