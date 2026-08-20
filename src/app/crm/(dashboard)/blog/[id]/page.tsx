import BlogPostForm from "@/components/crm/BlogPostForm";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-ink-900">Editar post</h1>
      <BlogPostForm postId={Number(id)} />
    </div>
  );
}
