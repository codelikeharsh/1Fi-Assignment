"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatInr } from "@/lib/emi";
import type { EmiPlan } from "@/lib/types";

export function EmiPlanList({
  plans,
  selectedTenure,
  onSelect,
}: {
  plans: EmiPlan[];
  selectedTenure: number;
  onSelect: (tenureMonths: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900">Choose your EMI plan</p>
      <RadioGroup
        value={String(selectedTenure)}
        onValueChange={(v) => onSelect(Number(v))}
        className="mt-2.5 flex flex-col gap-2"
      >
        {plans.map((plan) => {
          const id = `tenure-${plan.tenureMonths}`;
          const isActive = plan.tenureMonths === selectedTenure;
          return (
            <label
              key={plan.tenureMonths}
              htmlFor={id}
              className={
                "flex items-center justify-between rounded-[16px] border p-3.5 " +
                (isActive
                  ? "border-brand-purple bg-brand-purple-tint-bg"
                  : "border-zinc-200 bg-white")
              }
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value={String(plan.tenureMonths)} id={id} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{plan.tenureMonths} months</p>
                  <p className="text-[12px] text-gray-500">No-cost EMI · Backed by your investments</p>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-900">{formatInr(plan.monthlyAmount)}/mo</p>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
