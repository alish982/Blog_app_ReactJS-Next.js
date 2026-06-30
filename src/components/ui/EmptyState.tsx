import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-surface/60 px-6 py-16 text-center">
      {icon && <div className="text-ink/30">{icon}</div>}
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-ink">{title}</h3>
        {description && <p className="text-sm text-ink/60 max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
