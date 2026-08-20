import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { BlogService } from "@/lib/crm/blogService";
import { renderPostContent } from "@/lib/blog/render";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await BlogService.getPublishedBySlug(slug);
  if (!post) {
    return buildMetadata({ locale, title: "Blog KMON VIP", description: "Blog KMON VIP.", path: `/blog/${slug}` });
  }

  return buildMetadata({
    locale,
    title: `${post.title} — Blog KMON VIP`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover_image_url || undefined,
  });
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await BlogService.getPublishedBySlug(slug);
  if (!post) notFound();

  const html = renderPostContent(post.content);

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              {formatDate(post.published_at)} · {post.author}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              {post.title}
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed mb-10">{post.excerpt}</p>

            {post.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element -- editorial URLs are arbitrary hosts, unfit for next/image's allowlist
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full rounded-2xl mb-10 object-cover max-h-[420px]"
              />
            )}

            <div
              className="prose prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-ink-900"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
