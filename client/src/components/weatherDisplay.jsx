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
    <div>
      <div>
        <img
          src={`/images/${icon}`}
          className="w-[180px] mt-[15px] mx-auto"
          alt={data.weather[0].main}
        />
      </div>
      <h1 className="text-white font-sans text-[70px] font-normal m-0">
        {Math.round(data.main.temp)}°C
      </h1>
      <h2 className="text-white font-sans text-[50px] font-normal mt-0 mx-auto mb-10">
        {data.name}
      </h2>

      <div className="flex gap-[70px] justify-center">
        <div className="flex">
          <img src="/images/humidity.png" className="w-[35px] h-[35px]" alt="" />
          <div>
            <p className="text-white text-[25px] mx-[10px] m-0">{data.main.humidity}%</p>
            <p className="text-white mt-0 mb-[30px]">Humidity</p>
          </div>
        </div>
        <div className="flex">
          <img src="/images/wind.png" className="w-[35px] h-[35px]" alt="" />
          <div>
            <p className="text-white text-[25px] mx-[10px] m-0">{data.wind.speed} Km/h</p>
            <p className="text-white mt-0 mb-[30px]">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}