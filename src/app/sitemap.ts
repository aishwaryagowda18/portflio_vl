import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/nav";
import { allPublications } from "@/lib/publications";
import { contentUpdated, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = allRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: contentUpdated,
    changeFrequency: path === "/" || path === "/news" || path === "/publications" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/publications" || path === "/research" || path === "/about" ? 0.9 : 0.7,
  }));
  const pubs: MetadataRoute.Sitemap = allPublications.map((p) => ({
    url: `${siteUrl}/publications/${p.slug}`,
    lastModified: contentUpdated,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...pubs];
}
