import { createSlice } from "@reduxjs/toolkit";
import {
  getTransactionsCategories,
  getTransactionsSummaryByPeriod,
} from "./operations";

const initialState = {
  summary: [],
  periodTotal: 0,
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
        const payload = action.payload || {};
        if (Array.isArray(payload)) {
          state.summary = payload;
          state.periodTotal = 0;
        } else {
          state.summary = payload.categoriesSummary || payload.categories || [];
          state.periodTotal = payload.periodTotal || payload.total || 0;
        }
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