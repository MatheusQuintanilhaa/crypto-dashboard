"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "@/contexts/theme-context"

export function DashboardHeader() {
  const [globalData, setGlobalData] = useState<{
    total_market_cap: { usd: number }
    total_volume: { usd: number }
    market_cap_change_percentage_24h_usd: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchGlobalData() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global")
        if (!response.ok) throw new Error("Failed to fetch")

        const result = await response.json()
        console.log("Global data:", result.data) // Para debug

        setGlobalData({
          total_market_cap: result.data.total_market_cap,
          total_volume: result.data.total_volume,
          market_cap_change_percentage_24h_usd: result.data.market_cap_change_percentage_24h_usd,
        })
      } catch (error) {
        console.error("Error fetching global data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGlobalData()
  }, [])

  const formatCurrency = (value: number) => {
    if (!value || isNaN(value)) return "N/A"

    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toLocaleString()}`
  }

  const isPositive =
    globalData?.market_cap_change_percentage_24h_usd && globalData.market_cap_change_percentage_24h_usd > 0

  return (
    <TooltipProvider>
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl opacity-50" />

        <div
          className={`relative backdrop-blur-sm border rounded-xl p-6 ${
            theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/80 shadow-lg"
          }`}
        >
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Crypto Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Acompanhe as principais criptomoedas do mercado em tempo real</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-20 rounded-lg animate-pulse ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"}`}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`backdrop-blur-sm rounded-lg p-4 border ${
                  theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white/60 border-gray-200/50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Market Cap Total</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-accent transition-colors">
                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-50">
                      <p>Valor total do mercado de criptomoedas</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {globalData?.total_market_cap?.usd ? formatCurrency(globalData.total_market_cap.usd) : "N/A"}
                </p>
                {globalData?.market_cap_change_percentage_24h_usd && (
                  <div className={`flex items-center mt-1 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    <span>{Math.abs(globalData.market_cap_change_percentage_24h_usd).toFixed(2)}% (24h)</span>
                  </div>
                )}
              </div>

              <div
                className={`backdrop-blur-sm rounded-lg p-4 border ${
                  theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white/60 border-gray-200/50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Volume 24h</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-accent transition-colors">
                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-50">
                      <p>Volume total negociado nas últimas 24h</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {globalData?.total_volume?.usd ? formatCurrency(globalData.total_volume.usd) : "N/A"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Atualizado recentemente</p>
              </div>

              <div
                className={`backdrop-blur-sm rounded-lg p-4 border ${
                  theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white/60 border-gray-200/50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Dominância BTC</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-accent transition-colors">
                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-50">
                      <p>Percentual do mercado dominado pelo Bitcoin</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">₿</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">42.3%</p>
                </div>
                <div className={`w-full rounded-full h-1.5 mt-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                  <div className="bg-[#F7931A] h-1.5 rounded-full" style={{ width: "42.3%" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
