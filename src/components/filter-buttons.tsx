"use client";

import { Button } from "./ui/button";
import {
  TrendingUp,
  TrendingDown,
  List,
  DollarSign,
  BarChart3,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FilterButtonsProps {
  filter: "all" | "positive" | "negative";
  onFilterChange: (filter: "all" | "positive" | "negative") => void;
  sortBy: "market_cap" | "current_price";
  onSortChange: (sort: "market_cap" | "current_price") => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function FilterButtons({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
}: FilterButtonsProps) {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    if (theme === "light") {
      return {
        container: "bg-white/70 backdrop-blur-sm border-blue-200",
        buttonInactive: "text-slate-600 hover:text-slate-800 hover:bg-blue-50",
        buttonActive: "bg-blue-100 text-blue-700",
        dropdown: "border-blue-200 bg-white text-slate-800",
        dropdownItem: "hover:bg-blue-50",
        viewContainer: "bg-white/70 backdrop-blur-sm border-blue-200",
        viewButtonInactive:
          "text-slate-600 hover:text-slate-800 hover:bg-blue-50",
        viewButtonActive: "bg-blue-100 text-blue-700",
      };
    } else {
      return {
        container: "bg-gray-800/50 backdrop-blur-sm border-gray-700/50",
        buttonInactive: "text-gray-400 hover:text-white hover:bg-gray-700/50",
        buttonActive: "bg-gray-700 text-white",
        dropdown: "bg-gray-800 border-gray-700 text-gray-200",
        dropdownItem: "hover:bg-gray-700",
        viewContainer: "bg-gray-800/50 backdrop-blur-sm border-gray-700/50",
        viewButtonInactive:
          "text-gray-400 hover:text-white hover:bg-gray-700/50",
        viewButtonActive: "bg-gray-700 text-white",
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div
        className={`flex items-center gap-2 ${themeClasses.container} p-1 rounded-lg border`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange("all")}
          className={
            filter === "all"
              ? themeClasses.buttonActive
              : themeClasses.buttonInactive
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
              : `${
                  themeClasses.buttonInactive.split("hover:")[0]
                } hover:text-green-400 hover:bg-green-900/20`
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
              : `${
                  themeClasses.buttonInactive.split("hover:")[0]
                } hover:text-red-400 hover:bg-red-900/20`
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
              className={`${themeClasses.dropdown.split(" ")[0]} ${
                themeClasses.container.split(" ")[0]
              } ${themeClasses.buttonInactive}`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {sortBy === "market_cap" ? "Market Cap" : "Preço"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={themeClasses.dropdown}>
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuSeparator
              className={theme === "light" ? "bg-blue-200" : "bg-gray-700"}
            />
            <DropdownMenuItem
              onClick={() => onSortChange("market_cap")}
              className={`${themeClasses.dropdownItem} ${
                sortBy === "market_cap"
                  ? theme === "light"
                    ? "bg-blue-100"
                    : "bg-gray-700"
                  : ""
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Cap
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("current_price")}
              className={`${themeClasses.dropdownItem} ${
                sortBy === "current_price"
                  ? theme === "light"
                    ? "bg-blue-100"
                    : "bg-gray-700"
                  : ""
              }`}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Preço
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className={`${themeClasses.viewContainer} p-1 rounded-lg border`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("grid")}
            className={
              view === "grid"
                ? themeClasses.viewButtonActive
                : themeClasses.viewButtonInactive
            }
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("list")}
            className={
              view === "list"
                ? themeClasses.viewButtonActive
                : themeClasses.viewButtonInactive
            }
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
