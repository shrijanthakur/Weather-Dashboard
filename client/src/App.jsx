import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  async function loadWeather(params) {
    try {
      setError("");
      const data = await getCurrentWeather(params);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported, search manually.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        loadWeather({ lat: latitude, lon: longitude });
      },
      () => setError("Location permission denied. Search a city instead.")
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#00feba] to-[#5b548a] text-center max-w-[500px] w-[90%] mt-[100px] mx-auto rounded-[25px] pb-8">
      <SearchBar onSearch={(city) => loadWeather({ city })} />
      {error && <p className="error">{error}</p>}
      <WeatherDisplay data={weather} />
    </div>
  );
}