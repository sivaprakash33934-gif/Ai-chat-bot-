export function LeadsTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-hairline bg-paper-elevated p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-[44px] w-40 rounded border border-hairline bg-paper" />
          <div className="h-[44px] w-36 rounded border border-hairline bg-paper" />
          <div className="h-[44px] w-32 rounded border border-hairline bg-paper" />
        </div>
        <div className="h-4 w-28 rounded bg-hairline" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded border border-hairline bg-paper-elevated">
        <div className="hidden border-b border-hairline bg-paper px-6 py-4 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-4">
          <div className="col-span-1 h-4 w-4 rounded bg-hairline" />
          <div className="col-span-3 h-4 w-24 rounded bg-hairline" />
          <div className="col-span-2 h-4 w-20 rounded bg-hairline" />
          <div className="col-span-2 h-4 w-20 rounded bg-hairline" />
          <div className="col-span-2 h-4 w-20 rounded bg-hairline text-right" />
          <div className="col-span-2 h-4 w-24 rounded bg-hairline text-right" />
        </div>

        <div className="divide-y divide-hairline">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-5 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-4 min-[900px]:px-6"
            >
              <div className="h-4 w-20 rounded bg-hairline min-[900px]:col-span-1" />
              <div className="mt-2 h-4 w-36 rounded bg-hairline min-[900px]:col-span-3 min-[900px]:mt-0" />
              <div className="mt-2 h-4 w-24 rounded bg-hairline min-[900px]:col-span-2 min-[900px]:mt-0" />
              <div className="mt-2 h-4 w-20 rounded bg-hairline min-[900px]:col-span-2 min-[900px]:mt-0" />
              <div className="mt-2 h-4 w-16 rounded bg-hairline min-[900px]:col-span-2 min-[900px]:mt-0" />
              <div className="mt-2 h-4 w-24 rounded bg-hairline min-[900px]:col-span-2 min-[900px]:mt-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
