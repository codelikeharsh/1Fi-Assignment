import Image from "next/image";

export function ShopHero() {
  return (
    <div className="relative aspect-[7/4] w-full overflow-hidden rounded-b-[28px] bg-[#5b24b5]">
      <Image
        src="/shop-hero.png"
        alt="Shop today, pay later using mutual funds — no credit score required, no interest, backed by your investments."
        fill
        priority
        sizes="500px"
        className="object-cover"
      />
    </div>
  );
}
