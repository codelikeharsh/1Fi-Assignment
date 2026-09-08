import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchField({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[46px] items-center gap-[10px] rounded-full border border-gray-200 bg-white px-4",
        className,
      )}
    >
      <Search className="h-[17px] w-[17px] shrink-0 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />
    </div>
  );
}
