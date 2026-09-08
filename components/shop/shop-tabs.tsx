"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MarketplacePanel } from "@/components/marketplace/marketplace-panel";
import { EmptyState } from "@/components/shop/empty-state";
import { Store, MapPin } from "lucide-react";
import type { ProductSummary } from "@/lib/types";

const TABS = [
  { key: "top-brands", label: "Top Brands" },
  { key: "nearby-stores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ShopTabs({
  initialTab,
  initialProducts,
}: {
  initialTab: TabKey;
  initialProducts: ProductSummary[];
}) {
  const [active, setActive] = useState<TabKey>(initialTab);
  const router = useRouter();
  const [, startTransition] = useTransition();

  function selectTab(key: TabKey) {
    setActive(key);
    startTransition(() => {
      router.replace(`/shop?tab=${key}`, { scroll: false });
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="-mt-11 relative">
        <div
          aria-hidden
          className="absolute inset-x-1 top-0 h-[60px] rounded-[26px] bg-brand-purple-tint-bg/80"
        />
        <div
          role="tablist"
          className="relative flex gap-2 rounded-full border border-brand-purple-tint-border bg-brand-purple-tint-bg p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(tab.key)}
                className={cn(
                  "relative flex-1 whitespace-nowrap rounded-full py-[11px] text-center text-[13px] font-semibold tracking-[-0.005em] transition-all sm:text-sm",
                  isActive
                    ? "bg-white text-brand-purple shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-brand-purple" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {active === "top-brands" && (
        <EmptyState
          icon={Store}
          title="Top Brands"
          description="Not part of this assignment — see the 1Fi Marketplace tab."
        />
      )}

      {active === "nearby-stores" && (
        <EmptyState
          icon={MapPin}
          title="Nearby Stores"
          description="Not part of this assignment — see the 1Fi Marketplace tab."
        />
      )}

      {active === "marketplace" && <MarketplacePanel initialProducts={initialProducts} />}
    </div>
  );
}
