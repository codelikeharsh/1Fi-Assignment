import Image from "next/image";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/components/marketplace/detail-header";
import { ProductDetailClient } from "@/components/marketplace/product-detail-client";
import { getProductById } from "@/lib/data/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <DetailHeader title={product.name} />
      <div className="relative h-64 w-full bg-zinc-100">
        <Image src={product.image} alt={product.name} fill sizes="500px" className="object-cover" priority />
      </div>
      <div className="flex flex-1 flex-col px-4 py-5 pb-[calc(10.5rem+env(safe-area-inset-bottom))]">
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
