"use client"

import { useState, useEffect, useMemo } from "react"
import { CoinList } from "../components/coin-list"
import { SearchBar } from "../components/search-bar"
import { FilterButtons } from "../components/filter-buttons"
import { useCrypto } from "../hooks/use-crypto"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "../components/ui/alert"
import { DashboardHeader } from "../components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { MarketOverview } from "../components/market-overview"
import { useTheme } from "../contexts/theme-context"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all")
  const [sortBy, setSortBy] = useState<"market_cap" | "current_price">("market_cap")
  const [view, setView] = useState<"grid" | "list">("grid")
  const { theme } = useTheme()

  const { data: coins, isLoading, error, refetch } = useCrypto()

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Filter and sort coins
  const filteredCoins = useMemo(() => {
    if (!coins) return []

    let filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )

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
  }, [coins, debouncedSearch, filter, sortBy])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>
            Erro ao carregar dados. Verifique sua conexão.
            <button onClick={() => refetch()} className="ml-2 underline hover:no-underline">
              Tentar novamente
            </button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-950" : "bg-gradient-to-b from-gray-50 to-gray-100"
      } text-foreground`}
    >
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <Tabs defaultValue="market" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="market">Mercado</TabsTrigger>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por nome ou símbolo..." />
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
                <p className="text-muted-foreground animate-pulse">Carregando criptomoedas...</p>
              </div>
            ) : (
              <CoinList coins={filteredCoins} view={view} />
            )}
          </TabsContent>

          <TabsContent value="overview">
            <MarketOverview coins={coins || []} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
