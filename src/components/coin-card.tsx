"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useFavorites } from "../hooks/use-favorites";
import { useTheme } from "../contexts/theme-context";
import type { Coin } from "../types/crypto";

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { theme } = useTheme();
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

  const getCardClasses = () => {
    if (theme === "light") {
      return `crypto-card-glass-light ${
        isPositive
          ? "border-emerald-200 hover:border-emerald-300"
          : "border-rose-200 hover:border-rose-300"
      }`;
    } else {
      return `relative overflow-hidden transition-all duration-300 ${
        isPositive
          ? "bg-gradient-to-br from-gray-800/80 to-green-900/10 border-gray-700/50 hover:border-green-700/50"
          : "bg-gradient-to-br from-gray-800/80 to-red-900/10 border-gray-700/50 hover:border-red-700/50"
      } backdrop-blur-sm hover:shadow-lg hover:shadow-blue-900/10 hover:-translate-y-1`;
    }
  };

  const getTextClasses = () => {
    return {
      primary: theme === "light" ? "text-slate-800" : "text-white",
      secondary: theme === "light" ? "text-slate-600" : "text-gray-200",
      tertiary: theme === "light" ? "text-slate-500" : "text-gray-300",
      placeholder: theme === "light" ? "text-slate-600" : "text-gray-100",
      placeholderBg: theme === "light" ? "bg-slate-200" : "bg-gray-700",
    };
  };

  const getBackgroundGradientClasses = () => {
    if (theme === "light") {
      return `absolute inset-0 opacity-0 transition-opacity duration-300 ${
        isHovered ? "opacity-10" : ""
      } ${
        isPositive
          ? "bg-gradient-to-r from-emerald-100/50 to-blue-100/50"
          : "bg-gradient-to-r from-rose-100/50 to-purple-100/50"
      }`;
    } else {
      return `absolute inset-0 opacity-0 transition-opacity duration-300 ${
        isHovered ? "opacity-20" : ""
      } ${
        isPositive
          ? "bg-gradient-to-r from-green-500/20 to-blue-500/20"
          : "bg-gradient-to-r from-red-500/20 to-purple-500/20"
      }`;
    }
  };

  const textClasses = getTextClasses();

  return (
    <Link
      to={`/coin/${coin.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={getCardClasses()}>
        {/* Background gradient effect */}
        <div className={getBackgroundGradientClasses()} />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <div className="flex items-center space-x-3">
            {!imageError ? (
              <div className="relative">
                <img
                  src={coin.image || "/placeholder.svg"}
                  alt={coin.name}
                  className="w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
                <div
                  className={`absolute inset-0 rounded-full ${
                    isHovered ? "animate-ping" : ""
                  } ${
                    isPositive ? "bg-green-500/10" : "bg-red-500/10"
                  } opacity-0 ${isHovered ? "opacity-100" : ""}`}
                />
              </div>
            ) : (
              <div className={`w-9 h-9 ${textClasses.placeholderBg} rounded-full flex items-center justify-center`}>
                <span className={`text-sm font-bold ${textClasses.placeholder}`}>
                  {coin.symbol.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className={`font-semibold ${textClasses.primary} group-hover:text-blue-400 transition-colors`}>
                {coin.name}
              </h3>
              <div className="flex items-center gap-1">
                <p className={`text-sm ${textClasses.secondary} uppercase`}>{coin.symbol}</p>
                <span className={`text-xs ${textClasses.tertiary}`}>
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
                ? "text-red-500 hover:text-red-400 bg-red-500/10"
                : `${textClasses.tertiary} hover:text-red-500 hover:bg-red-500/10`
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
              <span className={`text-lg font-bold ${textClasses.primary}`}>
                {formatPrice(coin.current_price)}
              </span>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                  isPositive
                    ? "text-green-500 bg-green-500/10"
                    : "text-red-500 bg-red-500/10"
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
            <div className={`text-sm ${textClasses.secondary} space-y-1`}>
              <div className="flex justify-between">
                <span>Market Cap:</span>
                <span className={textClasses.primary}>
                  {formatMarketCap(coin.market_cap)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Volume 24h:</span>
                <span className={textClasses.primary}>
                  {formatMarketCap(coin.total_volume)}
                </span>
              </div>
            </div>

            {/* View details button that appears on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : ""
              }`}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
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
