import { Skeleton } from "@/components/ui/skeleton";
import { ProductListSkeleton } from "@/components/marketplace/product-list-skeleton";

export default function ShopLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="animate-pulse rounded-b-[28px] bg-zinc-200 px-4 pt-5 pb-16">
        <Skeleton className="h-6 w-28 rounded-full bg-zinc-300" />
        <Skeleton className="mt-3 h-16 w-2/3 rounded bg-zinc-300" />
      </div>
      <div className="flex flex-1 flex-col gap-5 px-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <Skeleton className="-mt-11 h-[52px] w-full rounded-full bg-zinc-200" />
        <Skeleton className="h-[46px] w-full rounded-full bg-zinc-100" />
        <ProductListSkeleton />
      </div>
    </div>
  );
}
