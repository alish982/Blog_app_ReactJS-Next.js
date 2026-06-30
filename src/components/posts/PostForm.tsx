"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostSchema } from "@/utils/validation/postSchemas";
import { Button, Input } from "@/components/ui";
import { RichTextEditor } from "./RichTextEditor";

interface PostFormProps {
  defaultValues?: Partial<PostSchema>;
  onSubmit: (values: PostSchema) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export function PostForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Title"
        placeholder="Give your post a clear, specific title"
        error={errors.title?.message}
        {...register("title")}
      />
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            label="Content"
            value={field.value ?? ""}
            onChange={field.onChange}
            placeholder="Write your post…"
            error={errors.body?.message}
          />
        )}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Category"
          placeholder="e.g. Engineering"
          hint="Optional"
          error={errors.category?.message}
          {...register("category")}
        />
        <Input
          label="Tags"
          placeholder="e.g. react, nextjs, ui"
          hint="Comma-separated, optional"
          error={errors.tags?.message}
          {...register("tags")}
        />
      </div>
      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
