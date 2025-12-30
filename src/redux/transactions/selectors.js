import { createSelector } from "@reduxjs/toolkit";

const selectAllTransactions = (state) => state.transactions?.items || [];

const selectTransactionsSummary = (state) =>
  state.transactions?.summary || null;

const AMPTY_ARRAY = [];
const selectCategoriesSummary = (state) =>
  state.transactions?.summary?.categoriesSummary || AMPTY_ARRAY;

const selectFilteredCategories = createSelector(
  [selectCategoriesSummary],
  (categoriesSummary) => {
    return Array.isArray(categoriesSummary)
      ? categoriesSummary.filter((item) => item.name !== "Income")
      : categoriesSummary?.filter((item) => item.name !== "Income") || [];
  }
);

const selectTrasactionIdForDelete = (state) =>
  state.transactions?.trasactionIdForDelete || null;

const selectTransactionForUpdate = (state) =>
  state.transactions?.transactionForUpdate || null;

const selectIsLoading = (state) => state.transactions?.isLoading || false;

export {
  selectAllTransactions,
  selectTransactionsSummary,
  selectTrasactionIdForDelete,
  selectTransactionForUpdate,
  selectFilteredCategories,
  selectIsLoading,
};
