import { postsApiInstance } from "./axiosInstance";
import type { Post, PostFormValues } from "@/types";
import { parseTags } from "@/utils/format";

export async function getPosts(): Promise<Post[]> {
  const { data } = await postsApiInstance.get<Post[]>("/posts");
  return data;
}

export async function getPost(id: string): Promise<Post> {
  const { data } = await postsApiInstance.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(
  values: PostFormValues,
  userId: string
): Promise<Post> {
  const { data } = await postsApiInstance.post<Post>("/posts", {
    title: values.title,
    body: values.body,
    category: values.category ?? "",
    tags: parseTags(values.tags),
    userId,
  });
  return data;
}

export async function updatePost(
  id: string,
  values: PostFormValues,
  userId: string
): Promise<Post> {
  const { data } = await postsApiInstance.put<Post>(`/posts/${id}`, {
    title: values.title,
    body: values.body,
    category: values.category ?? "",
    tags: parseTags(values.tags),
    userId,
  });
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await postsApiInstance.delete(`/posts/${id}`);
}
