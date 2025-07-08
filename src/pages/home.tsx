import { useState, useEffect, useMemo } from "react";
import { CoinList } from "../components/coin-list";
import { SearchBar } from "../components/search-bar";
import { FilterButtons } from "../components/filter-buttons";
import { useCrypto } from "../hooks/use-crypto";
import { Loader2, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { DashboardHeader } from "../components/dashboard-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { MarketOverview } from "../components/market-overview";
import { useTheme } from "../contexts/theme-context";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");
  const [sortBy, setSortBy] = useState<"market_cap" | "current_price">(
    "market_cap"
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const { theme } = useTheme();

  const { data: coins, isLoading, error, refetch } = useCrypto();

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and sort coins
  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    let filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    // Apply price change filter
    if (filter === "positive") {
      filtered = filtered.filter(
        (coin) => coin.price_change_percentage_24h > 0
      );
    } else if (filter === "negative") {
      filtered = filtered.filter(
        (coin) => coin.price_change_percentage_24h < 0
      );
    }

    // Sort coins
    filtered.sort((a, b) => {
      if (sortBy === "market_cap") {
        return b.market_cap - a.market_cap;
      }
      return b.current_price - a.current_price;
    });

    return filtered;
  }, [coins, debouncedSearch, filter, sortBy]);

  // Calculate market stats
  const marketStats = useMemo(() => {
    if (!coins)
      return { totalMarketCap: 0, totalVolume: 0, gainers: 0, losers: 0 };

    const totalMarketCap = coins.reduce(
      (sum, coin) => sum + coin.market_cap,
      0
    );
    const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
    const gainers = coins.filter(
      (coin) => coin.price_change_percentage_24h > 0
    ).length;
    const losers = coins.filter(
      (coin) => coin.price_change_percentage_24h < 0
    ).length;

    return { totalMarketCap, totalVolume, gainers, losers };
  }, [coins]);

  if (error) {
    return (
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "crypto-background-dark"
            : "crypto-background-light"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <Alert
            variant="destructive"
            className={`max-w-md mx-auto ${
              theme === "dark"
                ? "crypto-card-glass-dark"
                : "crypto-card-glass-light"
            }`}
          >
            <AlertDescription className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              Erro ao carregar dados das criptomoedas. Verifique sua conexão com
              a internet.
              <button
                onClick={() => refetch()}
                className="mt-3 px-4 py-2 crypto-button-primary rounded-lg text-sm font-medium hover:scale-105 transition-transform"
              >
                Tentar novamente
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "crypto-background-dark" : "crypto-background-light"
      } text-foreground relative`}
    >
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Dashboard Header */}
        <div
          className={`${
            theme === "dark"
              ? "crypto-card-glass-dark"
              : "crypto-card-glass-light"
          } rounded-2xl p-6 mb-8`}
        >
          <DashboardHeader />

          {/* Market Stats Row */}
          {!isLoading && coins && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-5 h-5 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Market Cap
                  </span>
                </div>
                <div className="crypto-text-gradient text-lg font-bold">
                  ${(marketStats.totalMarketCap / 1e12).toFixed(2)}T
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Volume 24h
                  </span>
                </div>
                <div className="crypto-text-gradient text-lg font-bold">
                  ${(marketStats.totalVolume / 1e9).toFixed(2)}B
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Gainers
                  </span>
                </div>
                <div className="crypto-text-gradient-success text-lg font-bold">
                  {marketStats.gainers}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-red-500 mr-1 rotate-180" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Losers
                  </span>
                </div>
                <div className="crypto-text-gradient-danger text-lg font-bold">
                  {marketStats.losers}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="market" className="mt-8">
          <TabsList
            className={`grid w-full max-w-md mx-auto grid-cols-2 gap-2 mb-8 ${
              theme === "dark"
                ? "crypto-card-glass-dark"
                : "crypto-card-glass-light"
            } p-2`}
          >
            <TabsTrigger
              value="market"
              className="crypto-button-primary data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium transition-all duration-300"
            >
              💰 Mercado
            </TabsTrigger>
            <TabsTrigger
              value="overview"
              className="crypto-button-primary data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium transition-all duration-300"
            >
              📊 Visão Geral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            {/* Enhanced Controls */}
            <div
              className={`${
                theme === "dark"
                  ? "crypto-card-glass-dark"
                  : "crypto-card-glass-light"
              } rounded-2xl p-6`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex-1 max-w-md">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="🔍 Buscar por nome ou símbolo..."
                    className="crypto-input-glass"
                  />
                </div>
                <FilterButtons
                  filter={filter}
                  onFilterChange={setFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  view={view}
                  onViewChange={setView}
                />
              </div>
            </div>

            {/* Enhanced Loading State */}
            {isLoading ? (
              <div
                className={`${
                  theme === "dark"
                    ? "crypto-card-glass-dark"
                    : "crypto-card-glass-light"
                } rounded-2xl p-12`}
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <Loader2 className="h-16 w-16 animate-spin crypto-text-gradient" />
                    <div className="absolute inset-0 h-16 w-16 rounded-full animate-ping bg-blue-500/20"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="crypto-text-gradient text-xl font-bold animate-pulse">
                      Carregando criptomoedas...
                    </p>
                    <p className="text-muted-foreground animate-pulse">
                      Obtendo dados em tempo real do mercado
                    </p>
                  </div>

                  {/* Loading skeleton cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          theme === "dark"
                            ? "crypto-card-glass-dark"
                            : "crypto-card-glass-light"
                        } rounded-xl p-4 animate-pulse`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full crypto-skeleton"></div>
                          <div className="space-y-1">
                            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded crypto-skeleton"></div>
                            <div className="w-12 h-3 bg-gray-300 dark:bg-gray-700 rounded crypto-skeleton"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded crypto-skeleton"></div>
                          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded crypto-skeleton"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <CoinList coins={filteredCoins} view={view} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="overview" className="animate-fade-in">
            <div
              className={`${
                theme === "dark"
                  ? "crypto-card-glass-dark"
                  : "crypto-card-glass-light"
              } rounded-2xl p-6`}
            >
              <MarketOverview coins={coins || []} isLoading={isLoading} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Action Button for Refresh */}
        {!isLoading && (
          <button
            onClick={() => refetch()}
            className={`fixed bottom-8 right-8 w-14 h-14 crypto-button-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-float z-50`}
            title="Atualizar dados"
          >
            <TrendingUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/5 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
      </div>
    </div>
  );
}
