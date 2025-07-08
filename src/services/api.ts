import type { Coin, CoinDetails } from "../types/crypto"

// Usando API alternativa que funciona melhor com CORS
const BASE_URL = "https://api.coingecko.com/api/v3"

class CryptoAPI {
  async getCoins(): Promise<Coin[]> {
    try {
      // Primeira tentativa: CoinGecko direto
      let response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      )

      // Se der erro de CORS, usa proxy
      if (!response.ok) {
        console.log("Tentando com proxy...")
        response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
          )}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const proxyData = await response.json()
        return JSON.parse(proxyData.contents)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching coins:", error)
      // Fallback: dados mock para demonstração
      return [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          current_price: 45000,
          market_cap: 850000000000,
          market_cap_rank: 1,
          fully_diluted_valuation: 950000000000,
          total_volume: 25000000000,
          high_24h: 46000,
          low_24h: 44000,
          price_change_24h: 1125,
          price_change_percentage_24h: 2.5,
          market_cap_change_24h: 21250000000,
          market_cap_change_percentage_24h: 2.5,
          circulating_supply: 19800000,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 69000,
          ath_change_percentage: -34.8,
          ath_date: "2021-11-10T14:24:11.849Z",
          atl: 67.81,
          atl_change_percentage: 66282.1,
          atl_date: "2013-07-06T00:00:00.000Z",
          roi: null,
          last_updated: new Date().toISOString()
        },
        {
          id: "ethereum",
          symbol: "eth", 
          name: "Ethereum",
          image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
          current_price: 3000,
          market_cap: 360000000000,
          market_cap_rank: 2,
          fully_diluted_valuation: 360000000000,
          total_volume: 15000000000,
          high_24h: 3050,
          low_24h: 2950,
          price_change_24h: -36,
          price_change_percentage_24h: -1.2,
          market_cap_change_24h: -4320000000,
          market_cap_change_percentage_24h: -1.2,
          circulating_supply: 120000000,
          total_supply: 120000000,
          max_supply: null,
          ath: 4878.26,
          ath_change_percentage: -38.5,
          ath_date: "2021-11-10T14:24:19.604Z",
          atl: 0.432979,
          atl_change_percentage: 692662.4,
          atl_date: "2015-10-20T00:00:00.000Z",
          roi: null,
          last_updated: new Date().toISOString()
        },
        {
          id: "tether",
          symbol: "usdt",
          name: "Tether",
          image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
          current_price: 1.0,
          market_cap: 95000000000,
          market_cap_rank: 3,
          fully_diluted_valuation: 95000000000,
          total_volume: 45000000000,
          high_24h: 1.002,
          low_24h: 0.998,
          price_change_24h: 0.001,
          price_change_percentage_24h: 0.1,
          market_cap_change_24h: 95000000,
          market_cap_change_percentage_24h: 0.1,
          circulating_supply: 95000000000,
          total_supply: 95000000000,
          max_supply: null,
          ath: 1.32,
          ath_change_percentage: -24.3,
          ath_date: "2018-07-24T00:00:00.000Z",
          atl: 0.572521,
          atl_change_percentage: 74.6,
          atl_date: "2015-03-02T00:00:00.000Z",
          roi: null,
          last_updated: new Date().toISOString()
        }
      ]
    }
  }

  async getCoinDetails(coinId: string): Promise<CoinDetails> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Moeda não encontrada")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching coin details:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro ao carregar detalhes da moeda")
    }
  }
}

export const cryptoApi = new CryptoAPI()
