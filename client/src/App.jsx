import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import SideMenu from "./components/SideMenu.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  async function loadWeather(params) {
    try {
      setError("");
      setWeather(await getCurrentWeather(params));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => loadWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setError("Location permission denied. Search a city instead.")
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#00feba] to-[#5b548a] text-center max-w-[500px] w-[90%] mt-[100px] mx-auto rounded-[25px] pb-8">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/30"
        >
          ☰
        </button>
        <span className="text-white text-sm font-medium">
          {user ? `Hi, ${user.username}` : "Weather Dashboard"}
        </span>
        <span className="w-9" />
      </div>

      <SearchBar onSearch={(city) => loadWeather({ city })} />
      {error && <p className="text-white">{error}</p>}
      <WeatherDisplay data={weather} />

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} currentWeather={weather} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}