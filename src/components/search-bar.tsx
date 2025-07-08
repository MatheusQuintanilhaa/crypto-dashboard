import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useTheme } from "../contexts/theme-context";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder,
  className,
}: SearchBarProps) {
  const { theme } = useTheme();
  
  const getThemeClasses = () => {
    if (theme === "light") {
      return {
        icon: "text-slate-500",
        input: "bg-white border-blue-200 text-slate-800 placeholder-slate-500 focus-visible:ring-blue-500 focus-visible:border-blue-400",
        button: "text-slate-500 hover:text-slate-700 hover:bg-blue-50",
        blur: "bg-blue-500/20"
      };
    } else {
      return {
        icon: "text-gray-400",
        input: "bg-gray-800/70 border-gray-700/50 text-white placeholder-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500",
        button: "text-gray-400 hover:text-white hover:bg-gray-700/50",
        blur: "bg-blue-500/10"
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="relative max-w-md w-full">
      <div className={`absolute inset-0 ${themeClasses.blur} rounded-lg blur-md opacity-30`} />
      <div className="relative flex items-center">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.icon} h-4 w-4`} />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            `pl-10 pr-10 focus-visible:ring-offset-0 ${themeClasses.input}`,
            className
          )}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${themeClasses.button}`}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  );
}
