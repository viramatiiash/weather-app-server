const express = require("express");
const { fetchWeather } = require("../services/weatherService");
const { getCached, setCached } = require("../utils/cache");

const router = express.Router();

router.get("/", async (req, res) => {
  const city = req.query.city?.toLowerCase();

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const cached = getCached(city);
  if (cached) return res.json(cached);

  try {
    const data = await fetchWeather(city);
    setCached(city, data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "City not found" });
  }
});

module.exports = router;
