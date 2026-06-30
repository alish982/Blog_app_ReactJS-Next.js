import { EditPostView } from "@/components/posts";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  return <EditPostView postId={id} />;
}
