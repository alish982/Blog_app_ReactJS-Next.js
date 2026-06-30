"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "@/store/postStore";
import { getPost } from "@/services/postService";
import type { Post } from "@/types";

export function usePost(id: string) {
  const cached = usePostStore((state) => state.posts.find((p) => p.id === id));
  const [fetchedPost, setFetchedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cached) return;
    let isActive = true;

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPost(id);
        if (isActive) setFetchedPost(data);
      } catch {
        if (isActive) setError("Couldn't load this post. It may not exist.");
      } finally {
        if (isActive) setIsLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [id, cached]);

  return {
    post: cached ?? fetchedPost,
    isLoading: cached ? false : isLoading,
    error: cached ? null : error,
  };
}
