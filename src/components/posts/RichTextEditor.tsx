"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import clsx from "clsx";
import { EditorToolbar } from "./EditorToolbar";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  error,
  hint,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: "text-accent underline underline-offset-2",
          },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write your post…",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[220px] px-3 py-2 text-sm text-ink leading-relaxed focus:outline-none",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      onChange(updatedEditor.isEmpty ? "" : updatedEditor.getHTML());
    },
  });

  const editorId = "post-content-editor";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={editorId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div
        id={editorId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${editorId}-error` : undefined}
        className={clsx(
          "rounded-lg border bg-surface transition-colors",
          "focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent",
          error ? "border-rose-400" : "border-line",
        )}
      >
        <EditorToolbar editor={editor} />
        <div className="border-t border-line">
          <EditorContent editor={editor} />
        </div>
      </div>
      {error ? (
        <p id={`${editorId}-error`} className="text-sm text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-ink/50">{hint}</p>
      ) : null}
    </div>
  );
}
