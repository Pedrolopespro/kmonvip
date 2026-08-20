import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { BlogService } from "@/lib/crm/blogService";

export const metadata: Metadata = buildMetadata({
  title: "Blog KMON VIP — Transporte Executivo, Blindado e Diplomático",
  description:
    "Bastidores, operações e bastões da KMON VIP: conteúdo sobre transporte executivo, blindado e diplomático no Brasil.",
  path: "/blog",
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogIndexPage() {
  const posts = await BlogService.listPublished();

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav crumbs={[{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }]} />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              A revista digital da KMON VIP
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Operações, bastidores e conteúdo sobre transporte executivo, blindado e diplomático.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5">
            {posts.length === 0 ? (
              <p className="text-ink-500">Em breve, novos conteúdos.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-ink-100 overflow-hidden bg-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] bg-ink-100 overflow-hidden">
                      {post.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element -- editorial URLs are arbitrary hosts, unfit for next/image's allowlist
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ink-300 text-sm">
                          KMON VIP
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs text-ink-400 mb-2">{formatDate(post.published_at)}</span>
                      <h2 className="text-lg font-medium tracking-tight leading-snug mb-2 group-hover:text-ink-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
