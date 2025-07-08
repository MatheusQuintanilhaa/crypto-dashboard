import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import type { Coin } from "../types/crypto";

interface MarketOverviewProps {
  coins: Coin[];
  isLoading: boolean;
}

// Theme helper functions
const getThemeClasses = (isDarkMode: boolean = false) => ({
  background: isDarkMode
    ? "bg-slate-900"
    : "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100",
  card: isDarkMode
    ? "bg-slate-800/90 border-slate-700"
    : "bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md",
  cardHover: isDarkMode
    ? "hover:bg-slate-700/90"
    : "hover:bg-gradient-to-br hover:from-white hover:to-blue-100",
  text: isDarkMode ? "text-slate-100" : "text-gray-900",  // Texto mais escuro
  textMuted: isDarkMode ? "text-slate-400" : "text-gray-700",  // Texto secundário mais escuro
  textLight: isDarkMode ? "text-slate-300" : "text-gray-600",  // Texto auxiliar mais escuro
  border: isDarkMode ? "border-slate-700" : "border-blue-200/50",
  button: isDarkMode
    ? "bg-slate-700 hover:bg-slate-600 border-slate-600"
    : "bg-blue-600 hover:bg-blue-700 border-blue-500",
  buttonSecondary: isDarkMode
    ? "bg-slate-800 hover:bg-slate-700 border-slate-600"
    : "bg-white hover:bg-blue-50 border-blue-300",
});

export function MarketOverview({ coins, isLoading }: MarketOverviewProps) {
  const theme = getThemeClasses();

  // Get top gainers and losers
  const topGainers = [...coins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5);

  const topLosers = [...coins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 5);

  // Get top by volume
  const topByVolume = [...coins]
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 5);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className={theme.card}>
            <CardHeader>
              <Skeleton className={`h-6 w-32 bg-blue-100/50`} />
              <Skeleton className={`h-4 w-48 bg-blue-100/50`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <Skeleton className={`h-8 w-24 bg-blue-100/50`} />
                    <Skeleton className={`h-6 w-20 bg-blue-100/50`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        className="bg-white border-green-400 shadow-lg"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black font-bold">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Top Gainers</span>
          </CardTitle>
          <CardDescription className="text-black font-medium">
            Maiores altas nas últimas 24h
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topGainers.map((coin) => (
              <Link
                to={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-green-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-black">{coin.name}</p>
                    <p className="text-sm text-black font-medium">
                      {formatPrice(coin.current_price)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-200 text-green-900 border-green-500 font-bold"
                >
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-green-800 hover:text-green-900 hover:bg-green-100 font-bold"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="bg-white border-red-400 shadow-lg"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black font-bold">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span>Top Losers</span>
          </CardTitle>
          <CardDescription className="text-black font-medium">
            Maiores quedas nas últimas 24h
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topLosers.map((coin) => (
              <Link
                to={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-black">{coin.name}</p>
                    <p className="text-sm text-black font-medium">
                      {formatPrice(coin.current_price)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-red-200 text-red-900 border-red-500 font-bold"
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-red-800 hover:text-red-900 hover:bg-red-100 font-bold"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="bg-white border-blue-400 shadow-lg"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
            <span>Top Volume</span>
          </CardTitle>
          <CardDescription className="text-black font-medium">
            Maior volume de negociação em 24h
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topByVolume.map((coin) => (
              <Link
                to={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-black">{coin.name}</p>
                    <p className="text-sm text-black font-medium">
                      {formatPrice(coin.current_price)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-black">
                    {formatVolume(coin.total_volume)}
                  </p>
                  <p className="text-sm text-black font-medium">24h</p>
                </div>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-blue-800 hover:text-blue-900 hover:bg-blue-100 font-bold"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
