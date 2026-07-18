const express = require("express");
const router = express.Router();

router.get("/current", async(req, res) => {
    const {city, lat, lon } = req.query;

    if(!city && !(lat && lon)) {
        return res.status(400).json({error: "Provide either city or lat/lon"});
    }

    const query = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&${query}&appid=${process.env.OPENWEATHER_KEY}`;

      try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

router.get("/forecast", async (req, res) => {
    const { city, lat, lon } = req.query;

    if (!city && !(lat && lon)) {
        return res.status(400).json({ error: "Provide either city or lat/lon" });
    }

    const query = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&${query}&appid=${process.env.OPENWEATHER_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404" || data.cod === 404) {
            return res.status(404).json({ error: "City not found" });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch forecast data" });
    }
});

module.exports = router;