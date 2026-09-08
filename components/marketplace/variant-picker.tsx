"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/types";

export function VariantPicker({
  variants,
  selectedId,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900">Select variant</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isActive = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant.id)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                isActive
                  ? "border-brand-purple bg-brand-purple-tint-bg text-brand-purple"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
              )}
            >
              {variant.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
