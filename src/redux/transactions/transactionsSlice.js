import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  editTransaction,
  removeTransaction,
  fetchCategoriesThunk,
} from "./transactionsThunks";

const initialState = {
  items: [],
  balance: 0,
  categories: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTransactions.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    })
      .addCase(fetchTransactions.fulfilled, (s, a) => {
        s.isLoading = false;
        s.items = a.payload.items;
        s.balance = a.payload.balance;
      })
      .addCase(fetchTransactions.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Fetch transactions failed";
      })

      .addCase(fetchCategoriesThunk.fulfilled, (s, a) => {
        s.categories = a.payload;
      })

      .addCase(addTransaction.fulfilled, (s, a) => {
        s.items = [a.payload.tx, ...s.items];
        if (typeof a.payload.balance === "number")
          s.balance = a.payload.balance;
      })
      .addCase(editTransaction.fulfilled, (s, a) => {
        s.items = s.items.map((t) =>
          t.id === a.payload.tx.id ? a.payload.tx : t
        );
        if (typeof a.payload.balance === "number")
          s.balance = a.payload.balance;
      })
      .addCase(removeTransaction.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t.id !== a.payload.id);
        if (typeof a.payload.balance === "number")
          s.balance = a.payload.balance;
      });
  },
});

export default slice.reducer;
