import { TextareaHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className, rows = 8, ...rest }, ref) => {
    const textareaId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={clsx(
            "rounded-lg border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink/40",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            "resize-y leading-relaxed",
            error ? "border-rose-400" : "border-line",
            className
          )}
          {...rest}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-sm text-rose-600">
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm text-ink/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
