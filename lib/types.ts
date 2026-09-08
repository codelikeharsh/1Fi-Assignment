export type ProductCategory = "electronics" | "travel" | "auto" | "jewelry";

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;
  price: number;
  maxTenureMonths: number;
}

export interface ProductDetail extends ProductSummary {
  description: string;
  highlights: string[];
  variants: ProductVariant[];
  emiTenureOptions: number[];
}

export interface EmiPlan {
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
}
