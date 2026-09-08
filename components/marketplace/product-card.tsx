import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/lib/types";
import { formatInr } from "@/lib/emi";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/shop/marketplace/${product.id}`}
      className="flex gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
        <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <p className="truncate text-lg font-bold tracking-[-0.015em] text-gray-900">{product.name}</p>
        <p className="truncate text-[13.5px] text-gray-500">{product.brand}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{formatInr(product.price)}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] font-medium text-brand-purple">
            No-cost EMI upto {product.maxTenureMonths}mo
          </span>
        </div>
      </div>
    </Link>
  );
}
