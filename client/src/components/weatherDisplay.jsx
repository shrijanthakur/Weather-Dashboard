const weatherIcons = {
  Clear: "clear.png",
  Clouds: "clouds.png",
  Rain: "rain.png",
  Snow: "snow.png",
  Drizzle: "drizzle.png",
  Mist: "mist.png",
  Haze: "mist.png",
  Thunderstorm: "rain.png",
};

export default function WeatherDisplay({ data }) {
  if (!data) return null;

  const icon = weatherIcons[data.weather[0].main] || "clear.png";

  return (
    <div className="weather">
      <img src={`/images/${icon}`} className="weather-icon" alt={data.weather[0].main} />
      <h1 className="temperature">{Math.round(data.main.temp)}°C</h1>
      <h2 className="city">{data.name}</h2>
      <div className="conditions">
        <p>{data.main.humidity}% Humidity</p>
        <p>{data.wind.speed} Km/h Wind</p>
      </div>
    </div>
  );
}