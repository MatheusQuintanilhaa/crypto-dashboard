"use client"

import React from "react"

import { useFavorites } from "@/hooks/use-favorites"
import { useCrypto } from "@/hooks/use-crypto"
import { CoinList } from "@/components/coin-list"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterButtons } from "@/components/filter-buttons"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { data: allCoins, isLoading } = useCrypto()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all")
  const [sortBy, setSortBy] = useState<"market_cap" | "current_price">("market_cap")
  const [view, setView] = useState<"grid" | "list">("grid")

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const favoriteCoins = useMemo(() => {
    if (!allCoins || !favorites.length) return []

    let filtered = allCoins.filter((coin) => favorites.includes(coin.id))

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    }

    // Apply price change filter
    if (filter === "positive") {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h > 0)
    } else if (filter === "negative") {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h < 0)
    }

    // Sort coins
    filtered.sort((a, b) => {
      if (sortBy === "market_cap") {
        return b.market_cap - a.market_cap
      }
      return b.current_price - a.current_price
    })

    return filtered
  }, [allCoins, favorites, debouncedSearch, filter, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-xl blur-xl opacity-50" />
          <div className="relative backdrop-blur-sm border border-gray-800 rounded-xl p-6 bg-gray-900/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md" />
                  <div className="relative bg-gradient-to-br from-red-500 to-pink-600 rounded-full p-3">
                    <Heart className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Favoritos</h1>
                  <p className="text-gray-400">
                    {favorites.length} {favorites.length === 1 ? "criptomoeda favoritada" : "criptomoedas favoritadas"}
                  </p>
                </div>
              </div>

              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-500/10 rounded-full blur-md" />
              <div className="relative bg-gray-800 rounded-full p-6">
                <Heart className="h-16 w-16 text-gray-600" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-300 mb-2">Nenhum favorito ainda</h2>
              <p className="text-gray-500 mb-6 max-w-md">
                Adicione suas criptomoedas favoritas para acompanhá-las facilmente e ter acesso rápido às informações
                mais importantes.
              </p>
            </div>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Explorar Criptomoedas</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar nos favoritos..." />
              <FilterButtons
                filter={filter}
                onFilterChange={setFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                view={view}
                onViewChange={setView}
              />
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="text-gray-400 animate-pulse">Carregando favoritos...</p>
              </div>
            ) : (
              <CoinList coins={favoriteCoins} view={view} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
