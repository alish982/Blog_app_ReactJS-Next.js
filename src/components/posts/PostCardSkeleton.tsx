export function PostCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-line bg-surface p-5">
      <div className="h-5 w-20 rounded-full bg-canvas animate-pulse" />
      <div className="mt-4 h-5 w-3/4 rounded bg-canvas animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-canvas animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-canvas animate-pulse" />
      </div>
      <div className="mt-5 h-4 w-1/3 rounded bg-canvas animate-pulse" />
    </div>
  );
}
