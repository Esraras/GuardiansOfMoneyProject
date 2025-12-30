import axios from "axios";

const ROOT = import.meta.env.DEV ? "/" : "https://wallet.b.goit.study/";
const API_BASE_URL = `${ROOT.replace(/\/?$/, "")}/api`;
const MONOBANK_CURRENCY_API = "https://api.monobank.ua/bank/currency";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("persist:auth");
    if (token) {
      try {
        const parsedToken = JSON.parse(JSON.parse(token).token);
        if (parsedToken) {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
      } catch (error) {
        console.error("Token parsing error:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getCurrentUser = async () => {
  const response = await api.get("/users/current");
  return response.data;
};

const CACHE_KEY = "currencyRatesCache";

export const getCurrencyRates = async () => {
  // 1. Fallback exchange rates should be in Number type
  const fallbackRates = [
    { currencyCodeA: 840, currencyCodeB: 980, rateBuy: 32.5, rateSell: 32.7 },
    { currencyCodeA: 978, currencyCodeB: 980, rateBuy: 35.1, rateSell: 35.4 },
  ];

  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { timestamp, rates } = JSON.parse(cachedData);

      // Use cached rates if cached less than 1 hour ago
      if (new Date().getTime() - timestamp < 3600000) {
        return rates;
      }
    }
  } catch {
    console.error("localStorage error, using fallback exchange rates.");
    return fallbackRates;
  }

  try {
    const response = await axios.get(MONOBANK_CURRENCY_API);
    const monoRates = response.data;

    const finalRates = monoRates
      .filter(
        (rate) =>
          (rate.currencyCodeA === 840 || rate.currencyCodeA === 978) &&
          rate.currencyCodeB === 980
      )
      .map((rate) => ({
        currencyCodeA: rate.currencyCodeA,
        currencyCodeB: rate.currencyCodeB,
        rateBuy: parseFloat(rate.rateBuy),
        rateSell: parseFloat(rate.rateSell),
      }))
      .filter((rate) => !isNaN(rate.rateBuy) && !isNaN(rate.rateSell));

    if (finalRates.length < 2) {
      return fallbackRates;
    }

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: new Date().getTime(), rates: finalRates })
    );

    return finalRates;
  } catch (error) {
    console.error("Monobank API error, using fallback exchange rates:", error);
    return fallbackRates;
  }
};
