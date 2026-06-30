"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { usePostStore } from "@/store/postStore";
import {
  createPost as createPostRequest,
  deletePost as deletePostRequest,
  getPosts,
  updatePost as updatePostRequest,
} from "@/services/postService";
import type { PostFormValues } from "@/types";

export function usePosts() {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const error = usePostStore((state) => state.error);
  const setPosts = usePostStore((state) => state.setPosts);
  const addPost = usePostStore((state) => state.addPost);
  const updatePostInStore = usePostStore((state) => state.updatePostInStore);
  const removePost = usePostStore((state) => state.removePost);
  const setLoading = usePostStore((state) => state.setLoading);
  const setError = usePostStore((state) => state.setError);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data.reverse());
    } catch {
      setError("Couldn't load posts. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [setPosts, setLoading, setError]);

  const createPost = useCallback(
    async (values: PostFormValues, userId: string) => {
      try {
        const created = await createPostRequest(values, userId);
        addPost(created);
        toast.success("Post published");
        return created;
      } catch {
        toast.error("Couldn't create the post. Please try again.");
        throw new Error("create_post_failed");
      }
    },
    [addPost],
  );

  const updatePost = useCallback(
    async (id: string, values: PostFormValues, userId: string) => {
      try {
        const updated = await updatePostRequest(id, values, userId);
        updatePostInStore(updated);
        toast.success("Post updated");
        return updated;
      } catch {
        toast.error("Couldn't update the post. Please try again.");
        throw new Error("update_post_failed");
      }
    },
    [updatePostInStore],
  );

  const deletePost = useCallback(
    async (id: string) => {
      try {
        await deletePostRequest(id);
        removePost(id);
        toast.success("Post deleted");
      } catch {
        toast.error("Couldn't delete the post. Please try again.");
        throw new Error("delete_post_failed");
      }
    },
    [removePost],
  );

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
