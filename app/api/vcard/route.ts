import { CARD, vcard } from "@/lib/card";

// 연락처 저장(.vcf) — 클라이언트 Blob 대신 서버가 파일로 내려준다.
// iOS 사파리는 blob: 다운로드를 자주 막지만, Content-Disposition 이 붙은
// 실제 응답은 연락처 앱으로 바로 넘겨준다.
export const runtime = "nodejs";

export async function GET() {
  // HTTP 헤더는 ASCII만 담을 수 있어 한글 파일명은 RFC 5987 형식으로 따로 붙인다.
  // (구형 클라이언트는 filename= 의 ASCII 이름으로 폴백)
  const korean = encodeURIComponent(`P.S.LAB_${CARD.name}_${CARD.title}.vcf`);
  return new Response(vcard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="pslab-card.vcf"; filename*=UTF-8''${korean}`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
