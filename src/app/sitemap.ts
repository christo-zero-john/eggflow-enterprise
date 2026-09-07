import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/product", "/how-it-works", "/faq", "/shipping-and-returns", "/contact", "/privacy", "/terms"];
  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/product" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/product" ? 0.9 : 0.5,
  }));
}
