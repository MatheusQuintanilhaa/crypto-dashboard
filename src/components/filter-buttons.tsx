"use client"

import { Button } from "./ui/button"
import { TrendingUp, TrendingDown, List, DollarSign, BarChart3, LayoutGrid, LayoutList } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface FilterButtonsProps {
  filter: "all" | "positive" | "negative"
  onFilterChange: (filter: "all" | "positive" | "negative") => void
  sortBy: "market_cap" | "current_price"
  onSortChange: (sort: "market_cap" | "current_price") => void
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function FilterButtons({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange("all")}
          className={
            filter === "all" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }
        >
          <List className="h-4 w-4 mr-1" />
          Todas
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange("positive")}
          className={
            filter === "positive"
              ? "bg-green-900/50 text-green-400"
              : "text-gray-400 hover:text-green-400 hover:bg-green-900/20"
          }
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Alta
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange("negative")}
          className={
            filter === "negative"
              ? "bg-red-900/50 text-red-400"
              : "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
          }
        >
          <TrendingDown className="h-4 w-4 mr-1" />
          Baixa
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {sortBy === "market_cap" ? "Market Cap" : "Preço"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200">
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              onClick={() => onSortChange("market_cap")}
              className={sortBy === "market_cap" ? "bg-gray-700" : ""}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Cap
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("current_price")}
              className={sortBy === "current_price" ? "bg-gray-700" : ""}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Preço
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("grid")}
            className={view === "grid" ? "bg-gray-700" : "text-gray-400"}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("list")}
            className={view === "list" ? "bg-gray-700" : "text-gray-400"}
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
