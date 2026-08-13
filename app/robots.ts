import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // 명함 인쇄 원본은 운영자가 내려받는 용도라 검색결과에 노출될 필요가 없다
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/downloads/namecard"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
