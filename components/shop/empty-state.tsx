import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[20px] border border-zinc-200 bg-white px-6 py-9 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-icon-bg text-brand-purple">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-[13.5px] leading-[1.45] text-gray-500">{description}</p>
    </div>
  );
}
