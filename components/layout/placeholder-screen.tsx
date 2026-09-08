export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-[calc(5rem+env(safe-area-inset-bottom))] text-center">
      <h1 className="text-lg font-bold tracking-[-0.015em] text-gray-900">{title}</h1>
      <p className="text-[13.5px] leading-[1.45] text-gray-500">
        Not part of this assignment — see the Shop tab for the 1Fi Marketplace build.
      </p>
    </main>
  );
}
