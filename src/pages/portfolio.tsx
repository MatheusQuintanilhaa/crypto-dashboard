import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function PortfolioPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
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
                <h1 className="text-3xl font-bold text-slate-800">Meu Portfolio</h1>
                <p className="text-slate-600">Acompanhe seus investimentos em criptomoedas</p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Moeda
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-white to-blue-50">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">Adicionar Moeda ao Portfolio</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coin" className="text-slate-700">Moeda</Label>
                    <select
                      id="coin"
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.target.value)}
                      className="w-full p-2 border border-blue-200 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
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
                    <Label htmlFor="amount" className="text-slate-700">Quantidade</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="any"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ex: 0.5"
                      className="border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-slate-700">Preço de Compra (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 45000"
                      className="border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                  <Button onClick={handleAddToPortfolio} className="w-full bg-blue-600 hover:bg-blue-700">
                    Adicionar ao Portfolio
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          {portfolio.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Valor Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {formatCurrency(stats.totalValue)}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Investido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {formatCurrency(stats.totalInvested)}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
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

              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
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
            >
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <Wallet className="h-16 w-16 text-slate-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Portfolio vazio
                </h3>
                <p className="text-slate-600 mb-6">
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
              <h2 className="text-xl font-semibold text-slate-800">Suas Moedas</h2>
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
                      <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
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
                                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                                  <Badge variant="outline" className="text-xs border-blue-200">
                                    {item.symbol.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {item.amount} {item.symbol.toUpperCase()}
                                </p>
                              </div>
                            </div>

                            <div className="text-right space-y-1">
                              <div className="text-lg font-semibold text-slate-800">
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

                          <div className="mt-4 pt-4 border-t border-blue-100">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500">Preço Médio:</span>
                                <div className="font-medium text-slate-800">
                                  {formatCurrency(item.averagePrice)}
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-500">Preço Atual:</span>
                                <div className="font-medium text-slate-800">
                                  {formatCurrency(currentPrice)}
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-500">Investido:</span>
                                <div className="font-medium text-slate-800">
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
