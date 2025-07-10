export interface PortfolioItem {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  amount: number;
  averagePrice: number;
  dateAdded: string;
}

export interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  totalPnL: number;
  totalPnLPercentage: number;
}
