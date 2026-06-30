"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import {
  PostCard,
  PostCardSkeleton,
  SearchInput,
  Pagination,
  DeletePostModal,
} from "@/components/posts";
import { Button, EmptyState } from "@/components/ui";
import { stripHtml } from "@/utils/format";
import type { Post } from "@/types";

const POSTS_PER_PAGE = 9;

export function DashboardView() {
  const { user } = useAuth();
  const { posts, isLoading, error, fetchPosts, deletePost } = usePosts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category).filter(Boolean))].sort(),
    [posts],
  );
  const tags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags ?? []))].sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        stripHtml(post.body).toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query);

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, search, selectedCategory, selectedTag]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await deletePost(postToDelete.userId);
      setPostToDelete(null);
      fetchPosts();
    } catch (e) {
      console.log("Error:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-ink/50">Welcome back</p>
        <h1 className="font-serif text-2xl text-ink sm:text-3xl">
          {user?.name ?? "Writer"}&apos;s posts
        </h1>
        <p className="text-sm text-ink/60">
          {posts.length} {posts.length === 1 ? "post" : "posts"} total
        </p>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title, content, or category…"
          />

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm dark:bg-surface-dark"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm dark:bg-surface-dark"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <Link href="/posts/create">
          <Button>New post</Button>
        </Link>
      </section>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : paginatedPosts.length === 0 ? (
        <EmptyState
          title={search ? "No posts match your search" : "No posts yet"}
          description={
            search
              ? "Try a different keyword or clear your search."
              : "Create your first post to see it here."
          }
          action={
            !search && (
              <Link href="/posts/create">
                <Button size="sm">Write your first post</Button>
              </Link>
            )
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.userId}
                post={post}
                onDeleteClick={setPostToDelete}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <DeletePostModal
        post={postToDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPostToDelete(null)}
      />
    </div>
  );
}
