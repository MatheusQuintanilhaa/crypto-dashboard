"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { useFavorites } from "../hooks/use-favorites";
import { useTheme } from "../contexts/theme-context";
import type { Coin } from "../types/crypto";

interface CoinRowProps {
  coin: Coin;
}

export function CoinRow({ coin }: CoinRowProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const isFavorite = favorites.includes(coin.id);
  const isPositive = coin.price_change_percentage_24h > 0;

  const getThemeClasses = () => {
    if (theme === "light") {
      return {
        container: "bg-white/80 hover:bg-blue-50/80 border-blue-200/50",
        ranking: "text-slate-500",
        name: "text-slate-800",
        symbol: "text-slate-600",
        price: "text-slate-800",
        mcap: "text-slate-600",
        placeholder: "text-slate-600",
        placeholderBg: "bg-slate-200",
        favoriteInactive: "text-slate-400 hover:text-red-500"
      };
    } else {
      return {
        container: "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50",
        ranking: "text-gray-300",
        name: "text-white",
        symbol: "text-gray-200",
        price: "text-white",
        mcap: "text-gray-200",
        placeholder: "text-gray-100",
        placeholderBg: "bg-gray-700",
        favoriteInactive: "text-gray-400 hover:text-red-500"
      };
    }
  };

  const themeClasses = getThemeClasses();

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

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className={`grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-lg ${themeClasses.container} transition-colors border backdrop-blur-sm`}>
        <div className="flex items-center gap-2">
          <span className={`${themeClasses.ranking} text-sm`}>#{coin.market_cap_rank}</span>
        </div>

        <div className="flex items-center gap-3">
          {!imageError ? (
            <img
              src={coin.image || "/placeholder.svg"}
              alt={coin.name}
              className="w-7 h-7 rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-7 h-7 ${themeClasses.placeholderBg} rounded-full flex items-center justify-center`}>
              <span className={`text-xs font-bold ${themeClasses.placeholder}`}>
                {coin.symbol.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${themeClasses.name}`}>{coin.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                className={`p-0 h-6 w-6 ${
                  isFavorite
                    ? "text-red-500 hover:text-red-400"
                    : themeClasses.favoriteInactive
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
            </div>
            <p className={`text-xs ${themeClasses.symbol} uppercase`}>{coin.symbol}</p>
          </div>
        </div>

        <div className="text-right">
          <p className={`font-medium ${themeClasses.price}`}>
            {formatPrice(coin.current_price)}
          </p>
          <p className={`text-xs ${themeClasses.mcap}`}>
            MCap: ${(coin.market_cap / 1e9).toFixed(2)}B
          </p>
        </div>

        <div
          className={`flex items-center gap-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="font-medium">
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
