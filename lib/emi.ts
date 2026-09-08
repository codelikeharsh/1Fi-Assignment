import type { EmiPlan } from "@/lib/types";

/**
 * All plans are no-cost EMI (0% interest) — the amount is simply the
 * final price split across the tenure, rounded up so the last
 * installment absorbs the remainder rather than falling short.
 */
export function buildEmiPlans(finalPrice: number, tenureOptions: number[]): EmiPlan[] {
  return tenureOptions
    .slice()
    .sort((a, b) => a - b)
    .map((tenureMonths) => {
      const monthlyAmount = Math.ceil(finalPrice / tenureMonths);
      return {
        tenureMonths,
        monthlyAmount,
        totalPayable: finalPrice,
      };
    });
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
