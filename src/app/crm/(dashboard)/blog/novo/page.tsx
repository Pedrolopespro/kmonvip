import BlogPostForm from "@/components/crm/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-ink-900">Novo post</h1>
      <BlogPostForm />
    </div>
  );
}
