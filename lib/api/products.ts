import type { ProductSummary } from "@/lib/types";

export async function fetchProducts(query: string, signal?: AbortSignal): Promise<ProductSummary[]> {
  const params = new URLSearchParams();
  if (query) params.set("q", query);

  const res = await fetch(`/api/products?${params.toString()}`, { signal });
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  const data = await res.json();
  return data.products as ProductSummary[];
}
