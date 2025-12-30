import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyRates } from "../../api/currencyApi.js";
import { MOCK_RATES } from "./currencySlice.js";

export const fetchCurrencyRates = createAsyncThunk(
  "currency/fetchCurrencyRates",
  async (_, thunkAPI) => {
    try {
      const rates = await getCurrencyRates();
      return rates;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn(
          "Monobank Rate Limit aşıldı (429). Mock Data kullanılıyor."
        );
        return MOCK_RATES;
      }
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch currency rates"
      );
    }
  }
);
