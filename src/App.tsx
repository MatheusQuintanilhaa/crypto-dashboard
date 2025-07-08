import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import HomePage from "./pages/home";
import CoinDetailsPage from "./pages/coin-details";
import FavoritesPage from "./pages/favorites";
import { useTheme } from "./contexts/theme-context";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme}`}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
