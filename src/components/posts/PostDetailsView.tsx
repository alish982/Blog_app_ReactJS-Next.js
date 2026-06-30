"use client";

import Link from "next/link";
import { usePost } from "@/hooks/usePost";
import { useAuth } from "@/hooks/useAuth";
import { Badge, Button, Loader, EmptyState } from "@/components/ui";
import { categoryColor, sanitizeHtml } from "@/utils/format";

interface PostDetailsViewProps {
  postId: string;
}

export function PostDetailsView({ postId }: PostDetailsViewProps) {
  const { post, isLoading, error } = usePost(postId);
  const { user } = useAuth();

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

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/dashboard"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:bg-slate-300 hover:shadow-sm active:scale-95 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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
        Back to dashboard
      </Link>

      <header className="flex flex-col gap-4 border-b border-line pb-6">
        {post.category && (
          <Badge className={categoryColor(post.category)}>
            {post.category}
          </Badge>
        )}
        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-ink/50">
          By{" "}
          {user && String(user.id) === post.userId
            ? user.name
            : `Author #${post.userId}`}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag}>{`#${tag}`}</Badge>
            ))}
          </div>
        )}
      </header>

      <div
        className="post-content text-base text-ink/80"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body) }}
      />

      <div className="flex justify-end gap-3 border-t border-line pt-6">
        <Link href={`/posts/${post.userId}/edit`}>
          <Button variant="secondary">Edit post</Button>
        </Link>
      </div>
    </article>
  );
}
