"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/emi";

export function ProceedBar({
  productName,
  monthlyAmount,
  tenureMonths,
}: {
  productName: string;
  monthlyAmount: number;
  tenureMonths: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="fixed inset-x-0 z-20 mx-auto w-full max-w-[500px] px-4"
        style={{ bottom: "calc(4.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-between gap-3 rounded-[20px] border border-zinc-200 bg-white p-3.5 shadow-[0_2px_10px_rgba(20,14,50,0.08)]">
          <div>
            <p className="text-[12px] text-gray-500">Selected plan</p>
            <p className="text-sm font-bold text-gray-900">
              {formatInr(monthlyAmount)}/mo <span className="font-medium text-gray-500">· {tenureMonths}mo</span>
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="rounded-full bg-brand-purple px-6 text-white hover:bg-brand-purple-hover"
          >
            Proceed
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-[500px] rounded-t-[24px]">
          <SheetHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-icon-bg text-brand-purple">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <SheetTitle className="text-center">EMI plan selected</SheetTitle>
            <SheetDescription className="text-center">
              {productName} · {formatInr(monthlyAmount)}/mo for {tenureMonths} months, backed by your
              investments. This is a demo flow for the assignment — no funds are pledged.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button
              size="lg"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-purple text-white hover:bg-brand-purple-hover"
            >
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
