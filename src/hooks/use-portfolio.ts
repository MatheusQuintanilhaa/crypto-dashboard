import { useState, useEffect } from "react";
import type { PortfolioItem, PortfolioStats } from "../types/portfolio";
import type { Coin } from "../types/crypto";

const PORTFOLIO_STORAGE_KEY = "crypto-portfolio";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  // Carregar portfolio do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading portfolio:", error);
      }
    }
  }, []);

  // Salvar portfolio no localStorage
  useEffect(() => {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (coin: Coin, amount: number, price: number) => {
    const existingItem = portfolio.find((item) => item.coinId === coin.id);

    if (existingItem) {
      // Atualizar item existente (média ponderada)
      const totalValue =
        existingItem.amount * existingItem.averagePrice + amount * price;
      const totalAmount = existingItem.amount + amount;
      const newAveragePrice = totalValue / totalAmount;

      setPortfolio((prev) =>
        prev.map((item) =>
          item.coinId === coin.id
            ? {
                ...item,
                amount: totalAmount,
                averagePrice: newAveragePrice,
                dateAdded: new Date().toISOString(),
              }
            : item
        )
      );
    } else {
      // Adicionar novo item
      const newItem: PortfolioItem = {
        id: `${coin.id}-${Date.now()}`,
        coinId: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        amount,
        averagePrice: price,
        dateAdded: new Date().toISOString(),
      };

      setPortfolio((prev) => [...prev, newItem]);
    }
  };

  const removeFromPortfolio = (itemId: string) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updatePortfolioItem = (
    itemId: string,
    amount: number,
    price: number
  ) => {
    setPortfolio((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              amount,
              averagePrice: price,
              dateAdded: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const calculateStats = (
    currentPrices: Record<string, number>
  ): PortfolioStats => {
    let totalValue = 0;
    let totalInvested = 0;

    portfolio.forEach((item) => {
      const currentPrice = currentPrices[item.coinId] || 0;
      totalValue += item.amount * currentPrice;
      totalInvested += item.amount * item.averagePrice;
    });

    const totalPnL = totalValue - totalInvested;
    const totalPnLPercentage =
      totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalPnL,
      totalPnLPercentage,
    };
  };

  return {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioItem,
    calculateStats,
  };
}
