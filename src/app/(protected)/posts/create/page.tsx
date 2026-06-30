import type { Metadata } from "next";
import { CreatePostView } from "@/components/posts";

export const metadata: Metadata = {
  title: "New post — Blog Post",
};

export default function CreatePostPage() {
  return <CreatePostView />;
}
