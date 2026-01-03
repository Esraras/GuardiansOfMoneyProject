import { createSlice } from "@reduxjs/toolkit";
import {
  getTransactionsCategories,
  getTransactionsSummaryByPeriod,
} from "./operations";

const initialState = {
  summary: [],
  categories: [],
  isStatisticsLoading: false,
  isStatisticsError: null,
};

const slice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => {
    builder
      // getTransactionsCategories için extraReducers
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isStatisticsLoading = false;
        state.isStatisticsError = null;
      })
      .addCase(getTransactionsCategories.pending, (state) => {
        state.isStatisticsLoading = true;
        state.isStatisticsError = null;
      })
      .addCase(getTransactionsCategories.rejected, (state, action) => {
        state.isStatisticsLoading = false;
        state.isStatisticsError = action.payload;
      })
      // getTransactionsSummaryByPeriod için extraReducers
      .addCase(getTransactionsSummaryByPeriod.fulfilled, (state, action) => {
        state.summary = action.payload.categoriesSummary || [];
        state.isStatisticsLoading = false;
        state.isStatisticsError = null;
      })
      .addCase(getTransactionsSummaryByPeriod.pending, (state) => {
        state.isStatisticsLoading = true;
        state.isStatisticsError = null;
      })
      .addCase(getTransactionsSummaryByPeriod.rejected, (state, action) => {
        state.isStatisticsLoading = false;
        state.isStatisticsError = action.payload;
      });
  },
});

export const statisticsReducer = slice.reducer;