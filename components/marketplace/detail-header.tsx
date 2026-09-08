"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function DetailHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 flex items-center gap-3 bg-white/90 px-4 py-3 backdrop-blur">
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white"
      >
        <ArrowLeft className="h-4 w-4 text-gray-700" />
      </button>
      <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
    </div>
  );
}
