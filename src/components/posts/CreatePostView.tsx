"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { PostForm } from "@/components/posts";
import type { PostSchema } from "@/utils/validation/postSchemas";

export function CreatePostView() {
  const { user } = useAuth();
  const { createPost } = usePosts();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: PostSchema) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const created = await createPost(values, String(user.id));
      console.log(created, 'helo ')
      router.push(`/posts/${created.userId}`);
    } catch {
      console.error("something went wrong")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <Link href="/dashboard" className="text-sm text-ink/50 hover:text-ink">
          ← Back to dashboard
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">New post</h1>
        <p className="mt-1 text-sm text-ink/60">
          Share something with your readers.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Publish post"
        />
      </div>
    </div>
  );
}
