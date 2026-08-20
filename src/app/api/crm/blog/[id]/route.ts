import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { BlogService, slugify } from "@/lib/crm/blogService";

export const runtime = "nodejs";

const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  coverImageUrl: z.string().nullable().optional(),
  author: z.string().min(1).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await BlogService.getById(Number(id));
  if (!post) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true, post });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const postId = Number(id);

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = UpdatePostSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const slug = parsed.data.slug ? slugify(parsed.data.slug) : undefined;
  if (parsed.data.slug !== undefined && !slug) {
    return NextResponse.json({ ok: false, error: "URL inválida." }, { status: 400 });
  }
  if (slug && (await BlogService.slugExists(slug, postId))) {
    return NextResponse.json({ ok: false, error: "Já existe um post com essa URL." }, { status: 409 });
  }

  const post = await BlogService.update(postId, { ...parsed.data, slug });
  if (!post) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true, post });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const removed = await BlogService.remove(Number(id));
  if (!removed) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
