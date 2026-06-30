import Link from "next/link";
import type { Post } from "@/types";
import { Badge } from "@/components/ui";
import { categoryColor, stripHtml, truncate } from "@/utils/format";

interface PostCardProps {
  post: Post;
  onDeleteClick: (post: Post) => void;
}

export function PostCard({ post, onDeleteClick }: PostCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        {post.category && (
          <Badge className={categoryColor(post.category)}>
            {post.category}
          </Badge>
        )}
        <span className="text-xs text-ink/40">#{post.userId}</span>
      </div>

      <Link href={`/posts/${post.userId}`} className="mt-3">
        <h3 className="font-serif text-lg leading-snug text-ink group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          {truncate(stripHtml(post.body), 110)}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag}>{`#${tag}`}</Badge>
            ))}
          </div>
        )}
      </Link>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <Link
          href={`/posts/${post.userId}`}
          className="text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          View post →
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/posts/${post.userId}/edit`}
            className="font-medium text-ink/60 hover:text-ink transition-colors"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDeleteClick(post)}
            className="font-medium text-rose-500 hover:text-rose-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
