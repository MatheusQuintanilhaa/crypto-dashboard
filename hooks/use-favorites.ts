"use client"

import { useState, useEffect, useCallback } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("crypto-favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
        setFavorites([])
      }
    }
    setIsLoaded(true)
  }, [])

  const addFavorite = useCallback((coinId: string) => {
    setFavorites((prev) => {
      if (prev.includes(coinId)) return prev
      const newFavorites = [...prev, coinId]
      localStorage.setItem("crypto-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  const removeFavorite = useCallback((coinId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== coinId)
      localStorage.setItem("crypto-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isLoaded,
  }
}
