import { connection } from "next/server";
import { sql } from "@/lib/db/client";
import type { BlogPostInput, BlogPostPatch, BlogPostRow, BlogPostStatus } from "./blogTypes";

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export const BlogService = {
  /** Admin listing — every status, newest first. */
  async listAll(): Promise<BlogPostRow[]> {
    return (await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`) as BlogPostRow[];
  },

  async getById(id: number): Promise<BlogPostRow | null> {
    const rows = (await sql`SELECT * FROM blog_posts WHERE id = ${id}`) as BlogPostRow[];
    return rows[0] ?? null;
  },

  /** Public site — published only. connection() keeps this out of static prerendering
   * (see siteSettingsService.ts) so a hide/edit in the CRM shows up immediately. */
  async listPublished(): Promise<BlogPostRow[]> {
    await connection();
    return (await sql`
      SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC
    `) as BlogPostRow[];
  },

  async getPublishedBySlug(slug: string): Promise<BlogPostRow | null> {
    await connection();
    const rows = (await sql`
      SELECT * FROM blog_posts WHERE slug = ${slug} AND status = 'published'
    `) as BlogPostRow[];
    return rows[0] ?? null;
  },

  async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    const rows = (await sql`
      SELECT id FROM blog_posts WHERE slug = ${slug} AND (${excludeId ?? null}::bigint IS NULL OR id != ${excludeId ?? null})
    `) as { id: number }[];
    return rows.length > 0;
  },

  async create(input: BlogPostInput): Promise<BlogPostRow> {
    const status = input.status ?? "draft";
    const publishedAt = status === "published" ? new Date().toISOString() : null;
    const rows = (await sql`
      INSERT INTO blog_posts (slug, title, excerpt, content, cover_image_url, author, status, published_at)
      VALUES (${input.slug}, ${input.title}, ${input.excerpt}, ${input.content},
              ${input.coverImageUrl ?? null}, ${input.author ?? "KMON VIP"}, ${status}, ${publishedAt})
      RETURNING *
    `) as BlogPostRow[];
    return rows[0];
  },

  async update(id: number, patch: BlogPostPatch): Promise<BlogPostRow | null> {
    const current = await this.getById(id);
    if (!current) return null;

    const next = {
      slug: patch.slug ?? current.slug,
      title: patch.title ?? current.title,
      excerpt: patch.excerpt ?? current.excerpt,
      content: patch.content ?? current.content,
      cover_image_url: patch.coverImageUrl !== undefined ? patch.coverImageUrl : current.cover_image_url,
      author: patch.author ?? current.author,
      status: (patch.status ?? current.status) as BlogPostStatus,
    };
    // First transition into "published" stamps published_at; later edits/re-hides don't move it.
    const publishedAt =
      next.status === "published" && !current.published_at ? new Date().toISOString() : current.published_at;

    const rows = (await sql`
      UPDATE blog_posts SET
        slug = ${next.slug}, title = ${next.title}, excerpt = ${next.excerpt}, content = ${next.content},
        cover_image_url = ${next.cover_image_url}, author = ${next.author}, status = ${next.status},
        published_at = ${publishedAt}, updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as BlogPostRow[];
    return rows[0] ?? null;
  },

  async remove(id: number): Promise<boolean> {
    const rows = (await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING id`) as { id: number }[];
    return rows.length > 0;
  },
};
