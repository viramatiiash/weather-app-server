const axios = require("axios");

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const trimmed = city.trim().toLowerCase();
  if (!trimmed) throw new Error("City name is empty");

  const res = await axios.get(API_URL, {
    params: { q: trimmed, appid: API_KEY, units: "metric" },
  });

  return {
    name: res.data.name,
    temp: Math.round(res.data.main.temp),
    humidity: res.data.main.humidity,
    wind: res.data.wind.speed,
    weather: res.data.weather[0].main,
    icon: res.data.weather[0].icon,
  };
}

module.exports = { fetchWeather };
