"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Receipt, ChartNoAxesCombined, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/emi-dues", label: "EMI Dues", icon: Receipt },
  { href: "/limit", label: "Limit", icon: ChartNoAxesCombined },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[500px] items-center justify-between rounded-t-[28px] bg-white px-1.5 py-1.5 shadow-[0_-2px_12px_rgba(20,14,50,0.08)]"
      style={{ paddingBottom: "calc(0.375rem + env(safe-area-inset-bottom))" }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2"
          >
            {active && (
              <span className="absolute top-0 h-[3px] w-8 rounded-full bg-brand-purple" />
            )}
            <Icon
              className={cn(
                "h-5 w-5",
                active ? "text-brand-purple drop-shadow-[0_2px_6px_rgba(113,44,220,0.35)]" : "text-gray-400",
              )}
              strokeWidth={active ? 2.4 : 2}
            />
            <span
              className={cn(
                "text-[10px] tracking-wide",
                active ? "font-bold text-brand-purple" : "font-medium text-gray-500",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
