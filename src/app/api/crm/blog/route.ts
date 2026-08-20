import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { BlogService, slugify } from "@/lib/crm/blogService";

export const runtime = "nodejs";

const CreatePostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImageUrl: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const posts = await BlogService.listAll();
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = CreatePostSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const baseSlug = slugify(parsed.data.slug || parsed.data.title);
  if (!baseSlug) {
    return NextResponse.json({ ok: false, error: "Título inválido para gerar URL." }, { status: 400 });
  }

  let slug = baseSlug;
  let suffix = 2;
  while (await BlogService.slugExists(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const post = await BlogService.create({
    slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    coverImageUrl: parsed.data.coverImageUrl || null,
    author: parsed.data.author,
    status: parsed.data.status,
  });

  return NextResponse.json({ ok: true, post });
}
