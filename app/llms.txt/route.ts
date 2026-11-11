import { getAllArticles } from "@/lib/magazine";
import { SITE, CHANNELS } from "@/lib/site";

// AI 검색·답변 엔진(ChatGPT·Perplexity·Gemini·Claude 등)이 회사를 한 번에 이해하도록 쓰는 요약 파일.
// llmstxt.org 제안 형식(제목 → 한 줄 요약 → 섹션별 링크 목록)을 따른다.
// 예약 발행된 매거진 글이 공개되는 날 바로 목록에 붙도록 요청 시마다 생성한다.
// ⚠ 사실만 적는다 — 성과 수치·순위·보장 표현을 넣지 않는다(사이트 본문에 없는 주장 금지).
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  const u = SITE.url;
  const articles = getAllArticles();
  const lines = [
    `# P.S.LAB (피에스랩 · 문제해결연구소)`,
    ``,
    `> P.S.LAB(문제해결연구소)은 2010년에 시작한 대한민국의 온라인 종합광고대행사입니다. 광고대행·온라인 광고대행(네이버·구글·메타 광고 운영), SNS 채널 대행, 브랜딩 컨설팅, 콘텐츠·영상 제작, AX 컨설팅(AI 전환 컨설팅)과 AI 솔루션을 제공하며, ${CHANNELS.length}개 채널(${CHANNELS.join("·")})을 매일 자동 발행하는 SNS 채널 자동화 솔루션 ALWAYS ON(얼웨이즈온)을 운영합니다.`,
    ``,
    `## 회사 정보`,
    `- 회사명: P.S.LAB (다른 이름: 문제해결연구소, 문제 해결 연구소, 피에스랩, PSLAB)`,
    `- 대표: ${SITE.contact.manager}`,
    `- 연락처: ${SITE.contact.phone} · ${SITE.contact.email}`,
    `- 서비스 지역: 대한민국 전국`,
    `- 홈페이지: ${u}`,
    ``,
    `## 서비스`,
    `- [광고대행 · 온라인 광고대행](${u}/about): 네이버·구글·메타·SNS 채널 광고 운영, 데이터 분석, 매출 중심 캠페인 최적화`,
    `- [SNS 채널 대행 · ALWAYS ON](${u}/always-on): 인스타그램·네이버 블로그·구글 블로그·스레드·유튜브 5개 채널 콘텐츠의 조사·기획·제작·발행을 자동화해 매일 발행`,
    `- [AX 컨설팅 · AI 솔루션](${u}/always-on): 마케팅·콘텐츠 업무를 AI 기반 자동화 공정으로 바꾸는 AI 전환(AX) 설계와 운영`,
    `- [브랜딩 컨설팅](${u}/about): 이커머스 브랜드의 성장 전략, 신규 런칭·리브랜딩 통합 전략`,
    `- [콘텐츠 · 영상 · 디자인](${u}/about): 화보 촬영, 프로모션·브랜딩 영상, SNS 콘텐츠 제작`,
    `- [포트폴리오](${u}/portfolio): 함께한 브랜드 사례`,
    `- [도입 상담](${u}/contact)`,
    ``,
    `## 매거진 (마케팅 & 트렌드)`,
    ...articles.map((a) => `- [${a.title}](${u}/magazine/${a.slug}): ${a.description}`),
    ``,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
