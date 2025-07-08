import { useQuery } from "@tanstack/react-query"
import { cryptoApi } from "../services/api"

export function useCoinDetails(coinId: string) {
  return useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => cryptoApi.getCoinDetails(coinId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!coinId,
  })
}
