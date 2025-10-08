const cache = {};

function getCached(city) {
  const now = Date.now();
  if (cache[city] && now - cache[city].timestamp < 10 * 60 * 1000) {
    return cache[city].data;
  }
  return null;
}

function setCached(city, data) {
  cache[city] = { data, timestamp: Date.now() };
}

module.exports = { getCached, setCached };
