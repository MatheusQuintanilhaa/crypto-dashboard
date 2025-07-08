"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import type { Coin } from "@/types/crypto"

interface CoinRowProps {
  coin: Coin
}

export function CoinRow({ coin }: CoinRowProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)

  const isFavorite = favorites.includes(coin.id)
  const isPositive = coin.price_change_percentage_24h > 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite) {
      removeFavorite(coin.id)
    } else {
      addFavorite(coin.id)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">#{coin.market_cap_rank}</span>
        </div>

        <div className="flex items-center gap-3">
          {!imageError ? (
            <Image
              src={coin.image || "/placeholder.svg"}
              alt={coin.name}
              width={28}
              height={28}
              className="rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-300">{coin.symbol.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{coin.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                className={`p-0 h-6 w-6 ${
                  isFavorite ? "text-red-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
            <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-medium">{formatPrice(coin.current_price)}</p>
          <p className="text-xs text-gray-400">MCap: ${(coin.market_cap / 1e9).toFixed(2)}B</p>
        </div>

        <div className={`flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="font-medium">{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
        </div>
      </div>
    </Link>
  )
}
