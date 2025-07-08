import type { Coin, CoinDetails } from "@/types/crypto"

const BASE_URL = "https://api.coingecko.com/api/v3"

class CryptoAPI {
  async getCoins(): Promise<Coin[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching coins:", error)
      throw new Error("Erro ao carregar dados das criptomoedas")
    }
  }

  async getCoinDetails(coinId: string): Promise<CoinDetails> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
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
