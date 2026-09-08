import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-64 w-full animate-pulse bg-zinc-200" />
      <div className="flex flex-1 flex-col gap-6 px-4 py-5">
        <div>
          <Skeleton className="h-3.5 w-24 rounded bg-zinc-100" />
          <Skeleton className="mt-2 h-6 w-3/4 rounded bg-zinc-200" />
          <Skeleton className="mt-2 h-5 w-1/3 rounded bg-zinc-200" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-full bg-zinc-100" />
          <Skeleton className="h-9 w-24 rounded-full bg-zinc-100" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-16 w-full rounded-[16px] bg-zinc-100" />
          <Skeleton className="h-16 w-full rounded-[16px] bg-zinc-100" />
          <Skeleton className="h-16 w-full rounded-[16px] bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}
