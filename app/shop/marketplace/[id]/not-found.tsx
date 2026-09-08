import Link from "next/link";
import { PackageX } from "lucide-react";
import { DetailHeader } from "@/components/marketplace/detail-header";

export default function ProductNotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <DetailHeader title="Product not found" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-icon-bg text-brand-purple">
          <PackageX className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-gray-900">We couldn&apos;t find that product</p>
        <p className="text-[13.5px] text-gray-500">It may have been removed or the link is incorrect.</p>
        <Link
          href="/shop?tab=marketplace"
          className="mt-1 rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Marketplace
        </Link>
      </div>
    </div>
  );
}
