"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormField, PrimaryButton, SecondaryButton, inputCls } from "@/components/crm/FormField";
import type { BlogPostRow } from "@/lib/crm/blogTypes";

function slugPreview(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: string;
  status: "draft" | "published";
};

const EMPTY: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  author: "KMON VIP",
  status: "draft",
};

export default function BlogPostForm({ postId }: { postId?: number }) {
  const router = useRouter();
  const isEdit = typeof postId === "number";

  const [form, setForm] = useState<FormState>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`/api/crm/blog/${postId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) {
          const post: BlogPostRow = json.post;
          setForm({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImageUrl: post.cover_image_url ?? "",
            author: post.author,
            status: post.status,
          });
          setSlugTouched(true);
        } else {
          setError("Post não encontrado.");
        }
      })
      .finally(() => setLoading(false));
  }, [isEdit, postId]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(nextStatus: "draft" | "published") {
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt,
      content: form.content,
      coverImageUrl: form.coverImageUrl ? form.coverImageUrl : isEdit ? null : undefined,
      author: form.author || undefined,
      ...(nextStatus ? { status: nextStatus } : {}),
    };

    const res = await fetch(isEdit ? `/api/crm/blog/${postId}` : "/api/crm/blog", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/crm/blog");
      router.refresh();
    } else {
      const json = await res.json().catch(() => null);
      setError(json?.error || "Não foi possível salvar o post.");
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-ink-500">Carregando...</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/crm/blog" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900">
        <ArrowLeft size={15} /> Voltar para o blog
      </Link>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">{error}</div>
      )}

      <FormField label="Título">
        <input
          className={inputCls()}
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((prev) => ({
              ...prev,
              title,
              slug: slugTouched ? prev.slug : slugPreview(title),
            }));
          }}
          required
        />
      </FormField>

      <FormField label="URL (slug)">
        <input
          className={`${inputCls()} font-mono text-sm`}
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            update("slug", slugPreview(e.target.value));
          }}
          placeholder={slugPreview(form.title) || "gerado-automaticamente"}
        />
      </FormField>

      <FormField label="Resumo (aparece na listagem)">
        <textarea
          className={`${inputCls()} min-h-20`}
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
        />
      </FormField>

      <FormField label="Conteúdo (Markdown)">
        <textarea
          className={`${inputCls()} min-h-80 font-mono text-sm`}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
      </FormField>

      <FormField label="Imagem de capa (URL, opcional)">
        <input
          className={inputCls()}
          value={form.coverImageUrl}
          onChange={(e) => update("coverImageUrl", e.target.value)}
          placeholder="https://..."
        />
      </FormField>

      <FormField label="Autor">
        <input className={inputCls()} value={form.author} onChange={(e) => update("author", e.target.value)} />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <PrimaryButton type="button" disabled={saving} onClick={() => handleSubmit("published")}>
          {saving ? "Salvando..." : "Salvar e publicar"}
        </PrimaryButton>
        <SecondaryButton type="button" disabled={saving} onClick={() => handleSubmit("draft")}>
          Salvar como rascunho
        </SecondaryButton>
      </div>
    </div>
  );
}
