"use client"

import { CoinCard } from "./coin-card"
import { CoinCardSkeleton } from "./coin-card-skeleton"
import { CoinRow } from "./coin-row"
import { CoinRowSkeleton } from "./coin-row-skeleton"
import type { Coin } from "@/types/crypto"

interface CoinListProps {
  coins: Coin[]
  isLoading?: boolean
  view: "grid" | "list"
}

export function CoinList({ coins, isLoading, view }: CoinListProps) {
  if (isLoading) {
    return view === "grid" ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CoinCardSkeleton key={i} />
        ))}
      </div>
    ) : (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <CoinRowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (coins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">Nenhuma criptomoeda encontrada</p>
        <p className="text-gray-500 text-sm">Tente ajustar seus filtros de busca</p>
      </div>
    )
  }

  return view === "grid" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  ) : (
    <div className="space-y-2 overflow-hidden">
      <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
        <span className="w-8">#</span>
        <span>Nome</span>
        <span className="text-right">Preço</span>
        <span className="text-right">24h %</span>
      </div>
      {coins.map((coin) => (
        <CoinRow key={coin.id} coin={coin} />
      ))}
    </div>
  )
}
