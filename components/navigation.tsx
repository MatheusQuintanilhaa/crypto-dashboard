"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, TrendingUp, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/contexts/theme-context"

export function Navigation() {
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/favorites", label: "Favoritos", icon: Heart, count: favorites.length },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl text-foreground">CryptoDash</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                        {item.count}
                      </span>
                    )}
                  </Button>
                </Link>
              )
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border text-foreground">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-xl">CryptoDash</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            size="lg"
                            className={`w-full justify-start ${
                              isActive
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            <Icon className="h-5 w-5 mr-3" />
                            {item.label}
                            {item.count !== undefined && item.count > 0 && (
                              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                                {item.count}
                              </span>
                            )}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-auto pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={toggleTheme}
                      className="w-full justify-start border-border text-muted-foreground hover:text-foreground hover:bg-accent bg-transparent"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 mr-3" />
                          Modo Claro
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 mr-3" />
                          Modo Escuro
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
