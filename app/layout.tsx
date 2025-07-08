import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { QueryProvider } from "@/components/query-provider"
import { ThemeProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Dashboard - Acompanhe as principais criptomoedas",
  description: "Dashboard profissional para acompanhar preços e tendências das principais criptomoedas do mercado",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
