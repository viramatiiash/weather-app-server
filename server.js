import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const cache = {};

app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city?.toLowerCase();

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const now = Date.now();

  if (cache[city] && now - cache[city].timestamp < 10 * 60 * 1000) {
    return res.json(cache[city].data);
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = {
      name: response.data.name,
      temp: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      weather: response.data.weather[0].main,
      icon: response.data.weather[0].icon,
    };

    cache[city] = { data, timestamp: now };

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "City not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
