import { Skeleton } from "@/components/ui/skeleton";

export function ProductListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex animate-pulse gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5">
          <Skeleton className="h-16 w-16 shrink-0 rounded-xl bg-zinc-200" />
          <div className="flex flex-1 flex-col justify-center gap-2">
            <Skeleton className="h-4 w-3/4 rounded bg-zinc-200" />
            <Skeleton className="h-3 w-1/2 rounded bg-zinc-100" />
            <Skeleton className="h-3 w-1/3 rounded bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
