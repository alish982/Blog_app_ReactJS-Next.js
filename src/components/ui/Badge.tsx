import clsx from "clsx";

interface BadgeProps {
  children: string;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className ?? "bg-canvas text-ink/70"
      )}
    >
      {children}
    </span>
  );
}
