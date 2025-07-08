"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Heart,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Share2,
  Info,
  Globe,
  Github,
  Twitter,
} from "lucide-react"
import { useCoinDetails } from "@/hooks/use-coin-details"
import { useFavorites } from "@/hooks/use-favorites"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CoinDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const coinId = params.id as string

  const { data: coin, isLoading, error, refetch } = useCoinDetails(coinId)
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)
  const [copied, setCopied] = useState(false)

  const isFavorite = favorites.includes(coinId)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(coinId)
    } else {
      addFavorite(coinId)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertDescription>
              Erro ao carregar dados da moeda.
              <button onClick={() => refetch()} className="ml-2 underline hover:no-underline">
                Tentar novamente
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-24 mb-6 bg-gray-800" />
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-gray-800" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-gray-800" />
                <Skeleton className="h-4 w-24 bg-gray-800" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <Skeleton className="h-4 w-24 bg-gray-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-6 w-32 bg-gray-700" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!coin) return null

  const isPositive = coin.market_data.price_change_percentage_24h > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white p-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h2 className="text-lg font-medium text-gray-400">Detalhes da Moeda</h2>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {copied ? "Copiado!" : "Compartilhar"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copiar link para compartilhar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={handleFavoriteClick}
              className={
                isFavorite
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Favoritado" : "Favoritar"}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Header with coin info */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl opacity-50" />
            <div className="relative backdrop-blur-sm border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  {!imageError ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                      <Image
                        src={coin.image.large || "/placeholder.svg"}
                        alt={coin.name}
                        width={80}
                        height={80}
                        className="rounded-full relative z-10"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-300">{coin.symbol.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl md:text-4xl font-bold">{coin.name}</h1>
                      <Badge variant="outline" className="text-xs font-medium uppercase border-gray-700 bg-gray-800/50">
                        {coin.symbol.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className="bg-blue-900/30 text-blue-400 border-blue-700 hover:bg-blue-900/50"
                      >
                        Rank #{coin.market_cap_rank}
                      </Badge>
                      {coin.links.homepage[0] && (
                        <a
                          href={coin.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Globe className="h-4 w-4" />
                          <span className="sr-only">Website</span>
                        </a>
                      )}
                      {coin.links.repos_url.github[0] && (
                        <a
                          href={coin.links.repos_url.github[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                      {coin.links.twitter_screen_name && (
                        <a
                          href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:ml-auto">
                  <div className="flex flex-col items-start md:items-end">
                    <div className="text-3xl md:text-4xl font-bold">
                      {formatPrice(coin.market_data.current_price.usd)}
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        isPositive ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-medium">
                        {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
                      </span>
                      <span className="text-sm text-gray-400">(24h)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800/50 border border-gray-700/50">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="markets">Mercados</TabsTrigger>
              <TabsTrigger value="about">Sobre</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-gray-400">Market Cap</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Valor total de mercado da criptomoeda</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{formatLargeNumber(coin.market_data.market_cap.usd)}</p>
                    <div
                      className={`flex items-center mt-1 text-sm ${
                        coin.market_data.market_cap_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {coin.market_data.market_cap_change_percentage_24h > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span>{Math.abs(coin.market_data.market_cap_change_percentage_24h).toFixed(2)}% (24h)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-gray-400">Volume 24h</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Volume total negociado nas últimas 24h</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{formatLargeNumber(coin.market_data.total_volume.usd)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {((coin.market_data.total_volume.usd / coin.market_data.market_cap.usd) * 100).toFixed(2)}% do
                      Market Cap
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-gray-400">Circulating Supply</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Quantidade de moedas em circulação</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">
                      {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                    </p>
                    {coin.market_data.max_supply && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Circulação</span>
                          <span>Máximo: {coin.market_data.max_supply.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${(coin.market_data.circulating_supply / coin.market_data.max_supply) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400">All Time High</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">{formatPrice(coin.market_data.ath.usd)}</p>
                      <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-800/30">
                        {coin.market_data.ath_change_percentage.usd.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(coin.market_data.ath_date.usd).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400">All Time Low</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">{formatPrice(coin.market_data.atl.usd)}</p>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800/30">
                        {Math.abs(coin.market_data.atl_change_percentage.usd).toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(coin.market_data.atl_date.usd).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400">Variação de Preço</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">24h</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"
                          }
                        >
                          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">7d</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_7d > 0 ? "text-green-400" : "text-red-400"
                          }
                        >
                          {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">30d</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_30d > 0 ? "text-green-400" : "text-red-400"
                          }
                        >
                          {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="markets">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Principais Mercados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Dados de mercado não disponíveis nesta versão.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              {/* Description */}
              {coin.description.en && (
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Sobre {coin.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: coin.description.en,
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Links */}
              {(coin.links.homepage[0] || coin.links.blockchain_site[0]) && (
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {coin.links.homepage[0] && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800/50"
                        >
                          <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Website Oficial
                          </a>
                        </Button>
                      )}
                      {coin.links.blockchain_site[0] && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800/50"
                        >
                          <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Explorer
                          </a>
                        </Button>
                      )}
                      {coin.links.repos_url.github[0] && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800/50"
                        >
                          <a href={coin.links.repos_url.github[0]} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {coin.links.twitter_screen_name && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800/50"
                        >
                          <a
                            href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
