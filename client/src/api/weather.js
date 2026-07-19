import { API_URL } from "./config";

export async function getCurrentWeather({ city, lat, lon }) {
  const query = city ? `city=${city}` : `lat=${lat}&lon=${lon}`;
  const res = await fetch(`${API_URL}/api/weather/current?${query}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch weather");
  return data;
}