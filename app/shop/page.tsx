import { ShopHero } from "@/components/shop/shop-hero";
import { ShopTabs } from "@/components/shop/shop-tabs";
import { getAllProducts } from "@/lib/data/products";

const VALID_TABS = ["top-brands", "nearby-stores", "marketplace"] as const;
type TabKey = (typeof VALID_TABS)[number];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab: TabKey = VALID_TABS.includes(tab as TabKey) ? (tab as TabKey) : "top-brands";
  const initialProducts = await getAllProducts();

  return (
    <div className="flex flex-1 flex-col">
      <ShopHero />
      <ShopTabs initialTab={initialTab} initialProducts={initialProducts} />
    </div>
  );
}
