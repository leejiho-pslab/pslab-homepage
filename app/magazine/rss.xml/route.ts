import { getAllArticles } from "@/lib/magazine";
import { SITE } from "@/lib/site";

// 네이버 서치어드바이저 'RSS 제출'용 피드 — 새 글이 색인에 빨리 잡히도록
export const revalidate = 3600;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const items = getAllArticles()
    .slice(0, 30)
    .map(
      (a) => `  <item>
    <title>${esc(a.title)}</title>
    <link>${SITE.url}/magazine/${a.slug}</link>
    <guid isPermaLink="true">${SITE.url}/magazine/${a.slug}</guid>
    <description>${esc(a.description)}</description>
    <category>${esc(a.category)}</category>
    <pubDate>${new Date(a.date + "T09:00:00+09:00").toUTCString()}</pubDate>
  </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>P.S.LAB Magazine — 마케팅 &amp; 트렌드</title>
  <link>${SITE.url}/magazine</link>
  <description>SNS 채널 운영, 콘텐츠 자동화(ALWAYS ON·얼웨이즈온), SEO 실전 노하우 — 주 3회 발행</description>
  <language>ko</language>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
