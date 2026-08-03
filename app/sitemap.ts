import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllArticles } from "@/lib/magazine";

// 예약 발행된 새 글이 항상 즉시 반영되도록 요청 시마다 생성
// (ISR 캐시 탓에 사이트맵이 며칠간 갱신되지 않던 문제 수정 — 생성 비용은 md 파일 읽기 수준)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  const routes: { path: string; priority: number; freq: "monthly" | "weekly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/portfolio", priority: 0.8, freq: "monthly" },
    { path: "/always-on", priority: 0.9, freq: "monthly" },
    { path: "/magazine", priority: 0.9, freq: "weekly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${base}/magazine/${a.slug}`,
    lastModified: new Date(a.date + "T09:00:00+09:00"),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticEntries, ...articleEntries];
}
