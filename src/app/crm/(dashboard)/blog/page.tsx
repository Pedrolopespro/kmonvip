"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import type { BlogPostRow } from "@/lib/crm/blogTypes";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function CrmBlogPage() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const fetchPosts = useCallback(() => {
    fetch("/api/crm/blog")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) setPosts(json.posts);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function toggleStatus(post: BlogPostRow) {
    setBusyId(post.id);
    const nextStatus = post.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/crm/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (res.ok) {
      const json = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === post.id ? json.post : p)));
    }
    setBusyId(null);
  }

  async function handleDelete(post: BlogPostRow) {
    if (!confirm(`Excluir "${post.title}"? Essa ação não pode ser desfeita.`)) return;
    setBusyId(post.id);
    const res = await fetch(`/api/crm/blog/${post.id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
    setBusyId(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-medium text-ink-900">Blog</h1>
          <p className="text-sm text-ink-500 mt-1">Conteúdo publicado em kmonvip.com/blog.</p>
        </div>
        <Link
          href="/crm/blog/novo"
          className="px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97] flex items-center gap-2"
          style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
        >
          <Plus size={16} /> Novo post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left">
              <th className="px-4 py-3 font-medium text-ink-700">Título</th>
              <th className="px-4 py-3 font-medium text-ink-700">Status</th>
              <th className="px-4 py-3 font-medium text-ink-700">Publicado em</th>
              <th className="px-4 py-3 font-medium text-ink-700">Atualizado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-500">
                  Carregando...
                </td>
              </tr>
            )}
            {!loading && posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-500">
                  Nenhum post ainda.{" "}
                  <Link href="/crm/blog/novo" className="underline text-ink-900">
                    Criar o primeiro
                  </Link>
                  .
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                <td className="px-4 py-3 font-medium text-ink-900 max-w-xs">
                  <div className="truncate">{post.title}</div>
                  <div className="text-xs text-ink-400 font-mono truncate">/blog/{post.slug}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      post.status === "published" ? "bg-accent-green/20 text-ink-900" : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{formatDate(post.published_at)}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{formatDate(post.updated_at)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/crm/blog/${post.id}`}
                      className="p-2 rounded-full text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors"
                      title="Editar"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => toggleStatus(post)}
                      disabled={busyId === post.id}
                      className="p-2 rounded-full text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors disabled:opacity-40"
                      title={post.status === "published" ? "Ocultar (voltar a rascunho)" : "Publicar"}
                    >
                      {post.status === "published" ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      disabled={busyId === post.id}
                      className="p-2 rounded-full text-ink-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                      title="Excluir"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
