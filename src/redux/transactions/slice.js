import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransactions,
  editTransactions,
  deleteTransactions,
} from "./operations";

const initialState = {
  isTransLoading: false,
  isTransError: null,
  transactions: [],
};

const slice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload;
      })
      .addCase(addTransactions.fulfilled, (state, { payload }) => {
        state.transactions = [...state.transactions, payload];
      })
      .addCase(editTransactions.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        if (index !== -1) {
          state.transactions[index] = payload;
        }
        state.isTransLoading = false;
        state.isTransError = null;
      })
      .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== payload
        );
      })
      .addMatcher(
        isAnyOf(
          getTransactions.fulfilled,
          addTransactions.fulfilled,
          editTransactions.fulfilled,
          deleteTransactions.fulfilled
        ),
        (state) => {
          state.isTransLoading = false;
          state.isTransError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactions.pending,
          addTransactions.pending,
          editTransactions.pending,
          deleteTransactions.pending
        ),
        (state) => {
          state.isTransLoading = true;
          state.isTransError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactions.rejected,
          addTransactions.rejected,
          editTransactions.rejected,
          deleteTransactions.rejected
        ),
        (state, { payload }) => {
          state.isTransLoading = false;
          state.isTransError = payload;
        }
      );
  },
});

export const transactionsReducer = slice.reducer;