import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/data/products";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (request.nextUrl.searchParams.get("simulateError") === "1") {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }

  const products = await searchProducts(query);
  return NextResponse.json({ products });
}
