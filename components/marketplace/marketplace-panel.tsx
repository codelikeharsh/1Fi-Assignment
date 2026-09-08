"use client";

import { useEffect, useRef, useState } from "react";
import { PackageSearch, RefreshCw } from "lucide-react";
import { SearchField } from "@/components/shop/search-field";
import { EmptyState } from "@/components/shop/empty-state";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProductListSkeleton } from "@/components/marketplace/product-list-skeleton";
import { fetchProducts } from "@/lib/api/products";
import type { ProductSummary } from "@/lib/types";

export function MarketplacePanel({ initialProducts }: { initialProducts: ProductSummary[] }) {
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState<{
    status: "loading" | "idle" | "error";
    results: ProductSummary[];
  }>({ status: "idle", results: initialProducts });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const abortRef = useRef<AbortController | undefined>(undefined);

  useEffect(() => {
    if (query === "") return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setSearchState((s) => ({ ...s, status: "loading" }));
      fetchProducts(query, controller.signal)
        .then((results) => setSearchState({ status: "idle", results }))
        .catch((err) => {
          if (err.name === "AbortError") return;
          setSearchState((s) => ({ ...s, status: "error" }));
        });
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const status = query === "" ? "idle" : searchState.status;
  const products = query === "" ? initialProducts : searchState.results;

  function retry() {
    setSearchState((s) => ({ ...s, status: "loading" }));
    fetchProducts(query)
      .then((results) => setSearchState({ status: "idle", results }))
      .catch(() => setSearchState((s) => ({ ...s, status: "error" })));
  }

  return (
    <div className="flex flex-col gap-5">
      <SearchField value={query} onChange={setQuery} placeholder="Search products..." />

      {status === "loading" && <ProductListSkeleton />}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-zinc-200 bg-white px-6 py-9 text-center">
          <p className="text-sm font-semibold text-gray-900">Couldn&apos;t load products</p>
          <p className="text-[13.5px] text-gray-500">Something went wrong. Please try again.</p>
          <button
            onClick={retry}
            className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-4 py-2 text-sm font-semibold text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {status === "idle" && products.length === 0 && (
        <EmptyState
          icon={PackageSearch}
          title="No matching products found"
          description="Try a different product or brand name."
        />
      )}

      {status === "idle" && products.length > 0 && (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
