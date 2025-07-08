import { Skeleton } from "@/components/ui/skeleton"

export function CoinRowSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
      <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />

      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-700" />
        <div>
          <Skeleton className="h-4 w-24 bg-gray-700 mb-1" />
          <Skeleton className="h-3 w-12 bg-gray-700" />
        </div>
      </div>

      <div className="text-right">
        <Skeleton className="h-4 w-20 bg-gray-700 mb-1" />
        <Skeleton className="h-3 w-16 bg-gray-700" />
      </div>

      <Skeleton className="h-4 w-16 bg-gray-700" />
    </div>
  )
}
