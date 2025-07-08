"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Coin } from "@/types/crypto"

interface MarketOverviewProps {
  coins: Coin[]
  isLoading: boolean
}

export function MarketOverview({ coins, isLoading }: MarketOverviewProps) {
  // Get top gainers and losers
  const topGainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5)

  const topLosers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5)

  // Get top by volume
  const topByVolume = [...coins].sort((a, b) => b.total_volume - a.total_volume).slice(0, 5)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${volume.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-gray-700" />
              <Skeleton className="h-4 w-48 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <Skeleton className="h-8 w-24 bg-gray-700" />
                    <Skeleton className="h-6 w-20 bg-gray-700" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-green-900/20 to-green-700/10 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Top Gainers</span>
          </CardTitle>
          <CardDescription>Maiores altas nas últimas 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topGainers.map((coin) => (
              <Link
                href={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-green-900/20 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(coin.current_price)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-green-400 hover:text-green-300 hover:bg-green-900/30"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-900/20 to-red-700/10 border-red-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            <span>Top Losers</span>
          </CardTitle>
          <CardDescription>Maiores quedas nas últimas 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topLosers.map((coin) => (
              <Link
                href={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-red-900/20 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(coin.current_price)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-700">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-red-400 hover:text-red-300 hover:bg-red-900/30"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/10 border-blue-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
              className="text-blue-500"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
            <span>Top Volume</span>
          </CardTitle>
          <CardDescription>Maior volume de negociação em 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topByVolume.map((coin) => (
              <Link
                href={`/coin/${coin.id}`}
                key={coin.id}
                className="flex items-center justify-between hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(coin.current_price)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatVolume(coin.total_volume)}</p>
                  <p className="text-xs text-gray-400">24h</p>
                </div>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
            >
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
