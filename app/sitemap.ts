import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllArticles } from "@/lib/magazine";

// 새 매거진 글이 자동으로 사이트맵에 포함되도록 1시간마다 재생성
export const revalidate = 3600;

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
