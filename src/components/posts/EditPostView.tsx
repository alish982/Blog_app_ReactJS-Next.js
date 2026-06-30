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
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-200 px-3 py-1 text-sm font-medium text-ink transition-all duration-200 hover:bg-slate-300 hover:shadow-sm active:scale-95 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">
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
