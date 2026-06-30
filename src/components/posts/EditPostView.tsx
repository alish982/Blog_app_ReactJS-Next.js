"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePost } from "@/hooks/usePost";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { PostForm } from "@/components/posts";
import { Loader, EmptyState, Button } from "@/components/ui";
import type { PostSchema } from "@/utils/validation/postSchemas";

interface EditPostViewProps {
  postId: string;
}

export function EditPostView({ postId }: EditPostViewProps) {
  const { post, isLoading, error } = usePost(postId);
  const { user } = useAuth();
  const { updatePost } = usePosts();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading post…" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <EmptyState
        title="Post not found"
        description={error ?? "This post may have been deleted."}
        action={
          <Link href="/dashboard">
            <Button size="sm">Back to dashboard</Button>
          </Link>
        }
      />
    );
  }

  const handleSubmit = async (values: PostSchema) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await updatePost(postId, values, String(user.id));
      router.push(`/posts/${postId}`);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href={`/posts/${postId}`}
          className="text-sm text-ink/50 hover:text-ink"
        >
          ← Back to post
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
          Edit post
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Update your post and save changes.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <PostForm
          defaultValues={{
            title: post.title,
            body: post.body,
            category: post.category ?? "",
            tags: post.tags?.join(", ") ?? "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
