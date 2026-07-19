const express = require("express");
const router = express.Router();

const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function fetchWeatherData(endpoint, req, res, errorLabel) {
    const { city, lat, lon } = req.query;

    if (!city && !(lat && lon)) {
        return res.status(400).json({ error: "Provide either city or lat/lon" });
    }

    const query = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;
    const cacheKey = `${endpoint}:${query}`;

    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json(cached.data);
        console.log("cached"); 
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?units=metric&${query}&appid=${process.env.OPENWEATHER_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404" || data.cod === 404) {
            return res.status(404).json({ error: "City not found" });
        }

        cache.set(cacheKey, { data, timestamp: Date.now() }); // save for next time
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: `Unable to fetch ${errorLabel}` });
    }
}

router.get("/current", (req, res) => {
    fetchWeatherData("weather", req, res, "weather data");
});

router.get("/forecast", (req, res) => {
    fetchWeatherData("forecast", req, res, "forecast data");
});

module.exports = router;