import clsx from "clsx";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

export function Loader({ size = "md", label, className }: LoaderProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-3", className)}>
      <span
        className={clsx(
          "animate-spin rounded-full border-current border-t-transparent text-accent",
          sizeMap[size]
        )}
        role="status"
        aria-label={label ?? "Loading"}
      />
      {label && <p className="text-sm text-ink/60">{label}</p>}
    </div>
  );
}
