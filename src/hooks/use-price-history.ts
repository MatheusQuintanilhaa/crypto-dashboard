import { useQuery } from "@tanstack/react-query";
import { cryptoApi } from "../services/api";
import type { PriceHistory, ChartDataPoint } from "../types/crypto";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useCoinPriceHistory(coinId: string, days: number = 7) {
  return useQuery({
    queryKey: ["coinPriceHistory", coinId, days],
    queryFn: () => cryptoApi.getCoinPriceHistory(coinId, days),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time feel
    enabled: !!coinId,
  });
}

export function transformPriceHistoryToChartData(
  priceHistory: PriceHistory
): ChartDataPoint[] {
  return priceHistory.prices.map((pricePoint, index) => {
    const [timestamp, price] = pricePoint;
    const [, volume] = priceHistory.total_volumes[index] || [timestamp, 0];
    const [, market_cap] = priceHistory.market_caps[index] || [timestamp, 0];

    return {
      timestamp,
      date: format(new Date(timestamp), "dd/MM HH:mm", { locale: ptBR }),
      price: Number(price.toFixed(2)),
      volume: Number(volume.toFixed(0)),
      market_cap: Number(market_cap.toFixed(0)),
    };
  });
}
