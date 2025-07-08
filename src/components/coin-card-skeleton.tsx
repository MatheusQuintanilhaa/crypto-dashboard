import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function CoinCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-700/10 to-transparent" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-9 w-9 rounded-full bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-700" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28 bg-gray-700" />
            <Skeleton className="h-5 w-16 rounded-full bg-gray-700" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20 bg-gray-700" />
              <Skeleton className="h-3 w-16 bg-gray-700" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16 bg-gray-700" />
              <Skeleton className="h-3 w-14 bg-gray-700" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
