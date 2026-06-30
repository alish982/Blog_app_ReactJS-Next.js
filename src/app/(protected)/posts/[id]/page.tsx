import { PostDetailsView } from "@/components/posts";

interface PostDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { id } = await params;
  return <PostDetailsView postId={id} />;
}
