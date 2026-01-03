import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getTransactionSummary,
  getCategories,
} from "../../services/services-api.js";
import { setToken } from "../../api/userTransactionApi.js";

export const getTransactionsSummaryByPeriod = createAsyncThunk(
  "statistics/getTransactionsSummaryByPeriod",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      const data = await getTransactionSummary(params);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "İşlem özeti alınamadı");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTransactionsCategories = createAsyncThunk(
  "statistics/getTransactionsCategories",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      const data = await getCategories();
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Categories could not be retrieved"
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);