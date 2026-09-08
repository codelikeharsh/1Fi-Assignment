"use client";

import { useMemo, useState } from "react";
import { VariantPicker } from "@/components/marketplace/variant-picker";
import { EmiPlanList } from "@/components/marketplace/emi-plan-list";
import { ProceedBar } from "@/components/marketplace/proceed-bar";
import { buildEmiPlans, formatInr } from "@/lib/emi";
import type { ProductDetail } from "@/lib/types";

export function ProductDetailClient({ product }: { product: ProductDetail }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [tenureMonths, setTenureMonths] = useState(product.emiTenureOptions[0]);

  const finalPrice = useMemo(() => {
    const variant = product.variants.find((v) => v.id === variantId);
    return product.price + (variant?.priceDelta ?? 0);
  }, [product, variantId]);

  const emiPlans = useMemo(
    () => buildEmiPlans(finalPrice, product.emiTenureOptions),
    [finalPrice, product.emiTenureOptions],
  );

  const selectedPlan = emiPlans.find((p) => p.tenureMonths === tenureMonths) ?? emiPlans[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[13.5px] text-gray-500">{product.brand}</p>
        <h1 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
          {product.name}
        </h1>
        <p className="mt-1 text-lg font-bold text-gray-900">{formatInr(finalPrice)}</p>
      </div>

      {product.variants.length > 0 && (
        <VariantPicker variants={product.variants} selectedId={variantId} onSelect={setVariantId} />
      )}

      <div>
        <p className="text-sm font-semibold text-gray-900">About this product</p>
        <p className="mt-1.5 text-[13.5px] leading-[1.45] text-gray-500">{product.description}</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {product.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[13px] text-gray-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <EmiPlanList plans={emiPlans} selectedTenure={tenureMonths} onSelect={setTenureMonths} />

      {selectedPlan && (
        <ProceedBar
          productName={product.name}
          monthlyAmount={selectedPlan.monthlyAmount}
          tenureMonths={selectedPlan.tenureMonths}
        />
      )}
    </div>
  );
}
