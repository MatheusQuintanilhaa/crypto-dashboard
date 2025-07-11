"use client";

// Fixed import issue for Vercel deployment
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
} from "lucide-react";
import { useCoinDetails } from "../hooks/use-coin-details";
import { useFavorites } from "../hooks/use-favorites";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import { PriceChart } from "../components/price-chart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useTheme } from "../contexts/theme-context";

export default function CoinDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const coinId = id as string;

  const { data: coin, isLoading, error, refetch } = useCoinDetails(coinId);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.includes(coinId);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(coinId);
    } else {
      addFavorite(coinId);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertDescription>
              Erro ao carregar dados da moeda.
              <button
                onClick={() => refetch()}
                className="ml-2 underline hover:no-underline"
              >
                Tentar novamente
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-24 mb-6 bg-gradient-to-br from-white to-blue-50 border-blue-200/30" />
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-gradient-to-br from-white to-blue-50 border-blue-200/30" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-gradient-to-br from-white to-blue-50 border-blue-200/30" />
                <Skeleton className="h-4 w-24 bg-gradient-to-br from-white to-blue-50 border-blue-200/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md"
                >
                  <CardHeader>
                    <Skeleton className="h-4 w-24 bg-blue-100/50" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-6 w-32 bg-blue-100/50" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!coin) return null;

  const isPositive = coin.market_data.price_change_percentage_24h > 0;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "crypto-background-dark" : "crypto-background-light"
      } text-foreground`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className={`p-2 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Detalhes da Moeda
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-300 hover:text-white"
                        : "bg-white hover:bg-blue-50 border-blue-300 text-slate-600 hover:text-slate-800"
                    }`}
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
                  : theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-300 hover:text-white"
                  : "bg-white hover:bg-blue-50 border-blue-300 text-slate-600 hover:text-slate-800"
              }
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Favoritado" : "Favoritar"}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Header with coin info */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-xl blur-xl opacity-50" />
            <div
              className={`relative backdrop-blur-sm ${
                theme === "dark"
                  ? "crypto-card-glass-dark"
                  : "crypto-card-glass-light"
              } shadow-md rounded-xl p-6`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  {!imageError ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                      <img
                        src={coin.image.large || "/placeholder.svg"}
                        alt={coin.name}
                        className="w-20 h-20 rounded-full relative z-10"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-20 h-20 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600/30"
                          : "bg-gradient-to-br from-white to-blue-50 border-blue-200/30"
                      } rounded-full flex items-center justify-center`}
                    >
                      <span
                        className={`text-2xl font-bold ${
                          theme === "dark" ? "text-gray-200" : "text-slate-800"
                        }`}
                      >
                        {coin.symbol.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h1
                        className={`text-3xl md:text-4xl font-bold ${
                          theme === "dark" ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {coin.name}
                      </h1>
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium uppercase ${
                          theme === "dark"
                            ? "border-gray-600/50 bg-gradient-to-br from-gray-800 to-gray-700"
                            : "border-blue-200/50 bg-gradient-to-br from-white to-blue-50"
                        }`}
                      >
                        {coin.symbol.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Rank #{coin.market_cap_rank}
                      </Badge>
                      {coin.links.homepage[0] && (
                        <a
                          href={coin.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`transition-colors ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-slate-600 hover:text-blue-600"
                          }`}
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
                          className={`transition-colors ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-slate-600 hover:text-blue-600"
                          }`}
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
                          className={`transition-colors ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-slate-600 hover:text-blue-600"
                          }`}
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
                    <div
                      className={`text-3xl md:text-4xl font-bold ${
                        theme === "dark" ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {formatPrice(coin.market_data.current_price.usd)}
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        isPositive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {Math.abs(
                          coin.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        (24h)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList
              className={`${
                theme === "dark"
                  ? "crypto-card-glass-dark border border-gray-600/50"
                  : "crypto-card-glass-light border border-blue-200/50"
              }`}
            >
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="markets">Mercados</TabsTrigger>
              <TabsTrigger value="about">Sobre</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-slate-600">
                        Market Cap
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Valor total de mercado da criptomoeda</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-slate-800">
                      {formatLargeNumber(coin.market_data.market_cap.usd)}
                    </p>
                    <div
                      className={`flex items-center mt-1 text-sm ${
                        coin.market_data.market_cap_change_percentage_24h > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {coin.market_data.market_cap_change_percentage_24h > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span>
                        {Math.abs(
                          coin.market_data.market_cap_change_percentage_24h
                        ).toFixed(2)}
                        % (24h)
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-slate-600">
                        Volume 24h
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Volume total negociado nas últimas 24h</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {formatLargeNumber(coin.market_data.total_volume.usd)}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      {(
                        (coin.market_data.total_volume.usd /
                          coin.market_data.market_cap.usd) *
                        100
                      ).toFixed(2)}
                      % do Market Cap
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-slate-600">
                        Circulating Supply
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Quantidade de moedas em circulação</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-slate-800">
                      {coin.market_data.circulating_supply.toLocaleString()}{" "}
                      {coin.symbol.toUpperCase()}
                    </p>
                    {coin.market_data.max_supply && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Circulação</span>
                          <span>
                            Máximo:{" "}
                            {coin.market_data.max_supply.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${
                                (coin.market_data.circulating_supply /
                                  coin.market_data.max_supply) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-600">
                      All Time High
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-slate-800">
                        {formatPrice(coin.market_data.ath.usd)}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 border-red-200"
                      >
                        {coin.market_data.ath_change_percentage.usd.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(
                        coin.market_data.ath_date.usd
                      ).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-600">
                      All Time Low
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-slate-800">
                        {formatPrice(coin.market_data.atl.usd)}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 border-green-200"
                      >
                        {Math.abs(
                          coin.market_data.atl_change_percentage.usd
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(
                        coin.market_data.atl_date.usd
                      ).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-600">
                      Variação de Preço
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">24h</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_24h > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {coin.market_data.price_change_percentage_24h.toFixed(
                            2
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">7d</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_7d > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {coin.market_data.price_change_percentage_7d.toFixed(
                            2
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">30d</span>
                        <span
                          className={
                            coin.market_data.price_change_percentage_30d > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {coin.market_data.price_change_percentage_30d.toFixed(
                            2
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chart" className="space-y-6">
              <PriceChart
                coinId={coin.id}
                coinName={coin.name}
                currentPrice={coin.market_data.current_price.usd}
                priceChange24h={coin.market_data.price_change_percentage_24h}
              />
            </TabsContent>

            <TabsContent value="markets" className="space-y-6">
              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">
                    Informações de Mercado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">24h High</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {formatPrice(coin.market_data.high_24h.usd)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">24h Low</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {formatPrice(coin.market_data.low_24h.usd)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        Market Cap Rank
                      </p>
                      <p className="text-lg font-semibold text-slate-800">
                        #{coin.market_cap_rank}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        Price Change (24h)
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formatPrice(coin.market_data.price_change_24h)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200/30 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">
                    Sobre {coin.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-slate-700">
                    {coin.description.en ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: coin.description.en.split(".")[0] + ".",
                        }}
                      />
                    ) : (
                      <p>Descrição não disponível.</p>
                    )}
                  </div>
                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold text-slate-800">Links</h4>
                    <div className="flex flex-wrap gap-2">
                      {coin.links.homepage[0] && (
                        <a
                          href={coin.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Globe className="h-3 w-3" />
                          Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {coin.links.repos_url.github[0] && (
                        <a
                          href={coin.links.repos_url.github[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Github className="h-3 w-3" />
                          GitHub
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {coin.links.twitter_screen_name && (
                        <a
                          href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Twitter className="h-3 w-3" />
                          Twitter
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
