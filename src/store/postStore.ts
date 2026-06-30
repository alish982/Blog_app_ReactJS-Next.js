import { create } from "zustand";
import type { Post } from "@/types";

interface PostStoreState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePostInStore: (post: Post) => void;
  removePost: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  setPosts: (posts) => set({ posts }),

  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

  updatePostInStore: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.userId ? { ...p, ...post } : p)),
    })),

  removePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
