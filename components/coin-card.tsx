"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import type { Coin } from "@/types/crypto";

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = favorites.includes(coin.id);
  const isPositive = coin.price_change_percentage_24h > 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(coin.id);
    } else {
      addFavorite(coin.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <Link
      to={`/coin/${coin.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`relative overflow-hidden transition-all duration-300 bg-white dark:bg-card-bg border-gray-200 dark:border-card-border hover:border-gray-300 dark:hover:border-card-border-hover backdrop-blur-sm hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-primary/5 hover:-translate-y-1 ${
          isPositive ? "hover:shadow-green-500/10" : "hover:shadow-red-500/10"
        }`}
      >
        {/* Background gradient effect */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-10" : ""
          } ${
            isPositive
              ? "bg-gradient-to-r from-green-400/20 to-blue-400/20"
              : "bg-gradient-to-r from-red-400/20 to-orange-400/20"
          }`}
        />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <div className="flex items-center space-x-3">
            {!imageError ? (
              <div className="relative">
                <img
                  src={coin.image || "/placeholder.svg"}
                  alt={coin.name}
                  width={36}
                  height={36}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
                <div
                  className={`absolute inset-0 rounded-full ${
                    isHovered ? "animate-ping" : ""
                  } ${
                    isPositive ? "bg-green-400/10" : "bg-red-400/10"
                  } opacity-0 ${isHovered ? "opacity-100" : ""}`}
                />
              </div>
            ) : (
              <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">
                  {coin.symbol.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {coin.name}
              </h3>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                  {coin.symbol}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  #{coin.market_cap_rank}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={`p-1 h-8 w-8 rounded-full ${
              isFavorite
                ? "text-red-600 hover:text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                : "text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
            } transition-colors`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(coin.current_price)}
              </span>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full font-semibold ${
                  isPositive
                    ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                    : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-xs font-medium">
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Market Cap:</span>
                <span className="font-medium">
                  {formatMarketCap(coin.market_cap)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Volume 24h:</span>
                <span className="font-medium">
                  {formatMarketCap(coin.total_volume)}
                </span>
              </div>
            </div>

            {/* View details button that appears on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-white/90 dark:from-gray-900/90 via-transparent to-transparent flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : ""
              }`}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/90 dark:bg-gray-800/90 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Ver detalhes <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
