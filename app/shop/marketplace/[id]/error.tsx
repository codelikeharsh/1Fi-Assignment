"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { DetailHeader } from "@/components/marketplace/detail-header";

export default function ProductDetailError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <DetailHeader title="Something went wrong" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-gray-900">Couldn&apos;t load this product</p>
        <p className="text-[13.5px] text-gray-500">Something went wrong. Please try again.</p>
        <button
          onClick={reset}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    </div>
  );
}
