export type BlogPostStatus = "draft" | "published";

export type BlogPostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  author?: string;
  status?: BlogPostStatus;
};

export type BlogPostPatch = Partial<{
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  author: string;
  status: BlogPostStatus;
}>;
