import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Trash2,
  Wallet,
} from "lucide-react";
import { usePortfolio } from "../hooks/use-portfolio";
import { useCrypto } from "../hooks/use-crypto";
import { useTheme } from "../contexts/theme-context";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function PortfolioPage() {
  const { theme } = useTheme();
  const { data: coins } = useCrypto();
  const { portfolio, addToPortfolio, removeFromPortfolio, calculateStats } = usePortfolio();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  // Criar mapa de preços atuais
  const currentPrices = useMemo(() => {
    const priceMap: Record<string, number> = {};
    coins?.forEach((coin) => {
      priceMap[coin.id] = coin.current_price;
    });
    return priceMap;
  }, [coins]);

  const stats = calculateStats(currentPrices);

  const handleAddToPortfolio = () => {
    if (!selectedCoin || !amount || !price) {
      toast.error("Preencha todos os campos");
      return;
    }

    const coin = coins?.find((c) => c.id === selectedCoin);
    if (!coin) {
      toast.error("Moeda não encontrada");
      return;
    }

    addToPortfolio(coin, parseFloat(amount), parseFloat(price));
    toast.success(`${coin.name} adicionado ao portfolio!`);
    
    setIsAddDialogOpen(false);
    setSelectedCoin("");
    setAmount("");
    setPrice("");
  };

  const handleRemoveFromPortfolio = (itemId: string, coinName: string) => {
    removeFromPortfolio(itemId);
    toast.success(`${coinName} removido do portfolio`);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getPageBackgroundClasses = () => {
    return theme === "light"
      ? "min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100"
      : "min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800";
  };

  const getCardClasses = () => {
    return theme === "light"
      ? "bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg"
      : "bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-lg";
  };

  const getTextClasses = () => {
    return {
      primary: theme === "light" ? "text-slate-800" : "text-white",
      secondary: theme === "light" ? "text-slate-600" : "text-slate-300",
      dialogBg: theme === "light" ? "bg-gradient-to-br from-white to-blue-50" : "bg-gradient-to-br from-slate-800 to-slate-700",
    };
  };

  const textClasses = getTextClasses();

  return (
    <div className={getPageBackgroundClasses()}>
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${textClasses.primary}`}>Meu Portfolio</h1>
                <p className={textClasses.secondary}>Acompanhe seus investimentos em criptomoedas</p>
              </div>
            </div>

            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Moeda
            </Button>

            {/* Modal Dialog */}
            {isAddDialogOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className={`${textClasses.dialogBg} p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border ${
                  theme === "light" ? "border-blue-200" : "border-slate-600"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${textClasses.primary}`}>
                      Adicionar Moeda ao Portfolio
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="p-1"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="coin" className={`block text-sm font-medium mb-1 ${textClasses.primary}`}>
                        Moeda
                      </label>
                      <select
                        id="coin"
                        value={selectedCoin}
                        onChange={(e) => setSelectedCoin(e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          theme === "light"
                            ? "border-blue-200 bg-white text-slate-800"
                            : "border-slate-600 bg-slate-700 text-white"
                        }`}
                      >
                        <option value="">Selecione uma moeda</option>
                        {coins?.map((coin) => (
                          <option key={coin.id} value={coin.id}>
                            {coin.name} ({coin.symbol.toUpperCase()})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="amount" className={`block text-sm font-medium mb-1 ${textClasses.primary}`}>
                        Quantidade
                      </label>
                      <Input
                        id="amount"
                        type="number"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Ex: 0.5"
                        className={`${
                          theme === "light"
                            ? "border-blue-200 focus:ring-blue-500"
                            : "border-slate-600 bg-slate-700 text-white focus:ring-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className={`block text-sm font-medium mb-1 ${textClasses.primary}`}>
                        Preço de Compra (USD)
                      </label>
                      <Input
                        id="price"
                        type="number"
                        step="any"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ex: 45000"
                        className={`${
                          theme === "light"
                            ? "border-blue-200 focus:ring-blue-500"
                            : "border-slate-600 bg-slate-700 text-white focus:ring-blue-400"
                        }`}
                      />
                    </div>
                    <Button onClick={handleAddToPortfolio} className="w-full bg-blue-600 hover:bg-blue-700">
                      Adicionar ao Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          {portfolio.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card className={getCardClasses()}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${textClasses.secondary} flex items-center gap-2`}>
                    <DollarSign className="h-4 w-4" />
                    Valor Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${textClasses.primary}`}>
                    {formatCurrency(stats.totalValue)}
                  </div>
                </CardContent>
              </Card>

              <Card className={getCardClasses()}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${textClasses.secondary} flex items-center gap-2`}>
                    <PieChart className="h-4 w-4" />
                    Investido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${textClasses.primary}`}>
                    {formatCurrency(stats.totalInvested)}
                  </div>
                </CardContent>
              </Card>

              <Card className={getCardClasses()}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${textClasses.secondary} flex items-center gap-2`}>
                    {stats.totalPnL >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    P&L Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      stats.totalPnL >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {formatCurrency(stats.totalPnL)}
                  </div>
                </CardContent>
              </Card>

              <Card className={getCardClasses()}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${textClasses.secondary}`}>
                    P&L Percentual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      stats.totalPnLPercentage >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {formatPercentage(stats.totalPnLPercentage)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Portfolio Items */}
          {portfolio.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <Wallet className={`h-16 w-16 mx-auto ${textClasses.secondary}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${textClasses.primary} mb-2`}>
                    Portfolio vazio
                  </h3>
                  <p className={`${textClasses.secondary} mb-6`}>
                    Comece adicionando suas primeiras criptomoedas ao portfolio
                  </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeira Moeda
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className={`text-xl font-semibold ${textClasses.primary}`}>Suas Moedas</h2>
              <div className="grid gap-4">
                {portfolio.map((item, index) => {
                  const currentPrice = currentPrices[item.coinId] || 0;
                  const currentValue = item.amount * currentPrice;
                  const investedValue = item.amount * item.averagePrice;
                  const pnl = currentValue - investedValue;
                  const pnlPercentage = investedValue > 0 ? (pnl / investedValue) * 100 : 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`${getCardClasses()} hover:shadow-xl transition-shadow`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className={`font-semibold ${textClasses.primary}`}>{item.name}</h3>
                                  <Badge variant="outline" className={`text-xs ${
                                    theme === "light" ? "border-blue-200" : "border-slate-500"
                                  }`}>
                                    {item.symbol.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${textClasses.secondary}`}>
                                  {item.amount} {item.symbol.toUpperCase()}
                                </p>
                              </div>
                            </div>

                            <div className="text-right space-y-1">
                              <div className={`text-lg font-semibold ${textClasses.primary}`}>
                                {formatCurrency(currentValue)}
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-medium ${
                                    pnl >= 0 ? "text-green-700" : "text-red-700"
                                  }`}
                                >
                                  {formatCurrency(pnl)} ({formatPercentage(pnlPercentage)})
                                </span>
                                {pnl >= 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFromPortfolio(item.id, item.name)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className={`mt-4 pt-4 border-t ${
                            theme === "light" ? "border-blue-100" : "border-slate-600"
                          }`}>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className={textClasses.secondary}>Preço Médio:</span>
                                <div className={`font-medium ${textClasses.primary}`}>
                                  {formatCurrency(item.averagePrice)}
                                </div>
                              </div>
                              <div>
                                <span className={textClasses.secondary}>Preço Atual:</span>
                                <div className={`font-medium ${textClasses.primary}`}>
                                  {formatCurrency(currentPrice)}
                                </div>
                              </div>
                              <div>
                                <span className={textClasses.secondary}>Investido:</span>
                                <div className={`font-medium ${textClasses.primary}`}>
                                  {formatCurrency(investedValue)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
