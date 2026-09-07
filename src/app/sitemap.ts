import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * One page. The sections are anchors on it, not routes, so there is nothing
 * else to list here yet. Add entries when /order and the legal pages land.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
