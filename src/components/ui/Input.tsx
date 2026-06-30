import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={clsx(
            "h-10 rounded-lg border bg-surface px-3 text-sm text-ink placeholder:text-ink/40",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            error ? "border-rose-400" : "border-line",
            className
          )}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-rose-600">
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm text-ink/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
