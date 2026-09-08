import "server-only";
import type { ProductDetail, ProductSummary } from "@/lib/types";

/**
 * Mock catalog. The assignment brief references "reference screens" and
 * "exact product/content requirements" that were never actually attached
 * to the assignment email — see 1Fi_Assignment_Notes.md. Categories here
 * (electronics / travel / auto / jewelry) mirror the real Shop page's
 * "Top Brands" list and hero banner art, since that's the closest thing
 * to real reference content available.
 */
const PRODUCTS: ProductDetail[] = [
  {
    id: "iphone-15",
    name: "iPhone 15",
    brand: "Apple Premium Reseller",
    category: "electronics",
    image: "/products/iphone15.webp",
    price: 79900,
    maxTenureMonths: 24,
    description:
      "6.1-inch Super Retina XDR display, A16 Bionic chip, and a 48MP main camera with 2x optical-quality zoom.",
    highlights: ["A16 Bionic chip", "48MP main camera", "USB-C", "Up to 20 hours video playback"],
    variants: [
      { id: "128gb-black", label: "128GB · Black", priceDelta: 0 },
      { id: "256gb-black", label: "256GB · Black", priceDelta: 10000 },
      { id: "256gb-blue", label: "256GB · Blue", priceDelta: 10000 },
      { id: "512gb-blue", label: "512GB · Blue", priceDelta: 30000 },
    ],
    emiTenureOptions: [3, 6, 9, 12, 18, 24],
  },
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2",
    brand: "Apple Premium Reseller",
    category: "electronics",
    image: "/products/macbookair.webp",
    price: 114900,
    maxTenureMonths: 24,
    description:
      "13.6-inch Liquid Retina display in a fanless design, powered by the M2 chip for all-day battery life.",
    highlights: ["Apple M2 chip", "18-hour battery", "1080p FaceTime HD camera", "Fanless silent design"],
    variants: [
      { id: "8gb-256gb", label: "8GB / 256GB", priceDelta: 0 },
      { id: "16gb-512gb", label: "16GB / 512GB", priceDelta: 40000 },
    ],
    emiTenureOptions: [3, 6, 9, 12, 18, 24],
  },
  {
    id: "croma-smart-led-55",
    name: "Croma Smart LED TV",
    brand: "Croma",
    category: "electronics",
    image: "/products/cromasmartledtv.webp",
    price: 42990,
    maxTenureMonths: 6,
    description: "4K Ultra HD smart LED TV with Dolby Audio and built-in streaming apps.",
    highlights: ["4K Ultra HD", "Dolby Audio", "3x HDMI, 2x USB", "Built-in Wi-Fi"],
    variants: [
      { id: "43-inch", label: "43 inch", priceDelta: -8000 },
      { id: "55-inch", label: "55 inch", priceDelta: 0 },
      { id: "65-inch", label: "65 inch", priceDelta: 22000 },
    ],
    emiTenureOptions: [3, 6],
  },
  {
    id: "re-classic-350",
    name: "Royal Enfield Classic 350",
    brand: "Ashoka Suzuki",
    category: "auto",
    image: "/products/royal-enfield-classic-350.png",
    price: 193000,
    maxTenureMonths: 18,
    description: "A timeless silhouette with the refined J-series 350cc engine and dual-channel ABS.",
    highlights: ["349cc J-series engine", "Dual-channel ABS", "Electronic fuel injection"],
    variants: [
      { id: "stealth-black", label: "Stealth Black", priceDelta: 0 },
      { id: "gunmetal-grey", label: "Gunmetal Grey", priceDelta: 4000 },
      { id: "chrome", label: "Chrome", priceDelta: 12000 },
    ],
    emiTenureOptions: [6, 12, 18],
  },
  {
    id: "caratlane-solitaire-ring",
    name: "CaratLane Solitaire Ring",
    brand: "CaratLane",
    category: "jewelry",
    image: "/products/ring.webp",
    price: 55000,
    maxTenureMonths: 6,
    description: "A certified solitaire set in 18K gold, finished with a mirror polish band.",
    highlights: ["IGI certified", "18K/22K gold options", "Lifetime exchange"],
    variants: [
      { id: "18k-gold", label: "18K Gold", priceDelta: 0 },
      { id: "22k-gold", label: "22K Gold", priceDelta: 15000 },
    ],
    emiTenureOptions: [3, 6],
  },
  {
    id: "easemytrip-bali",
    name: "Bali Holiday Package",
    brand: "EaseMyTrip Holiday",
    category: "travel",
    image: "/products/bali.webp",
    price: 64999,
    maxTenureMonths: 24,
    description: "5 nights / 6 days across Ubud and Seminyak, including flights and daily breakfast.",
    highlights: ["5N/6D itinerary", "Return flights included", "4-star stays", "Daily breakfast"],
    variants: [
      { id: "standard", label: "Standard", priceDelta: 0 },
      { id: "deluxe", label: "Deluxe", priceDelta: 25000 },
    ],
    emiTenureOptions: [3, 6, 12, 18, 24],
  },
];

const LATENCY_MS = 450;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSummary(product: ProductDetail): ProductSummary {
  const { id, name, brand, category, image, price, maxTenureMonths } = product;
  return { id, name, brand, category, image, price, maxTenureMonths };
}

export async function getAllProducts(): Promise<ProductSummary[]> {
  await sleep(LATENCY_MS);
  return PRODUCTS.map(toSummary);
}

export async function searchProducts(query: string | null): Promise<ProductSummary[]> {
  await sleep(LATENCY_MS);
  const normalized = query?.trim().toLowerCase();
  if (!normalized) return PRODUCTS.map(toSummary);
  return PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(normalized) || p.brand.toLowerCase().includes(normalized),
  ).map(toSummary);
}

export async function getProductById(id: string): Promise<ProductDetail | null> {
  await sleep(LATENCY_MS);
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
