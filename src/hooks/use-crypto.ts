import { useQuery } from "@tanstack/react-query"
import { cryptoApi } from "../services/api"

export function useCrypto() {
  return useQuery({
    queryKey: ["coins"],
    queryFn: cryptoApi.getCoins,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}
