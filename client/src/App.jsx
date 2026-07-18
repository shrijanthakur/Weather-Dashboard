import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import SideMenu from "./components/SideMenu";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

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
    <>
      <SideMenu currentWeather={weather} />
      <div className="bg-gradient-to-br from-[#00feba] to-[#5b548a] text-center max-w-[500px] w-[90%] mt-[100px] mx-auto rounded-[25px] pb-8">
        <SearchBar onSearch={(city) => loadWeather({ city })} />
        {error && <p className="text-white">{error}</p>}
        <WeatherDisplay data={weather} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}