import { z } from "zod";
import { stripHtml } from "@/utils/format";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120, "Title is too long"),
  body: z
    .string()
    .min(1, "Content is required")
    .refine((value) => stripHtml(value).length >= 10, {
      message: "Content must be at least 10 characters",
    }),
  category: z.string().optional(),
  tags: z.string().optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
