import type { MetadataRoute } from "next";
import { services, cities, fleet, crossPages } from "@/lib/seo/constants";
import { getIndexableLocales } from "@/lib/seo/i18n-status";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/seo/locale-urls";
import { BlogService } from "@/lib/crm/blogService";

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap {
  const indexableLocales = getIndexableLocales(path);
  const languages = buildHreflangAlternates(path, indexableLocales);

  // Only emit URLs for locales that actually have indexable content at
  // this path — sitemap and metadata share the same source of truth
  // (getIndexableLocales), so they can never disagree.
  return indexableLocales.map((locale) => ({
    url: buildLocaleUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    ...(languages ? { alternates: { languages } } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await BlogService.listPublished();

  const all: MetadataRoute.Sitemap = [
    ...entry("", 1.0),

    ...entry("/servicos", 0.9),
    ...entry("/atuacao", 0.9),
    ...entry("/frota", 0.9),

    ...services.flatMap((s) => entry(`/servicos/${s.slug}`, 0.8)),
    ...cities.flatMap((c) => entry(`/atuacao/${c.slug}`, 0.8)),
    ...fleet.flatMap((f) => entry(`/frota/${f.slug}`, 0.8)),

    ...crossPages.flatMap((p) => entry(`/servicos/${p.serviceSlug}/${p.citySlug}`, 0.7)),

    ...entry("/diplomatic-transport-brazil", 0.8),

    ...entry("/sobre", 0.6, "yearly"),
    ...entry("/sobre/historia", 0.6, "yearly"),
    ...entry("/clientes", 0.6),
    ...entry("/contato", 0.6, "yearly"),
    ...entry("/cotacao", 0.7, "yearly"),

    ...entry("/politica-de-privacidade", 0.3, "yearly"),
    ...entry("/lgpd", 0.3, "yearly"),

    ...entry("/blog", 0.6, "weekly"),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, 0.5, "monthly", new Date(p.updated_at))),
  ];

  return all;
}
