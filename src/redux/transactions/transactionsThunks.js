import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllTransactionsNormalized,
  createTransaction,
  updateTransaction,
  deleteTransactionById,
  fetchCategories,
  normalizeTransaction,
} from "../../api/userTransactionApi";

const selectToken = (state) => state.auth?.token ?? null;

// LIST + BALANCE
export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState());
      const { items, balance } = await fetchAllTransactionsNormalized(token);
      return { items, balance };
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Fetch failed");
    }
  }
);

// CATEGORIES
export const fetchCategoriesThunk = createAsyncThunk(
  "transactions/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState());
      const data = await fetchCategories(token);

      const list = data?.categories ?? data ?? [];
      return list;
    } catch (e) {
      return rejectWithValue(
        e?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);

// ADD
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (formData, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = selectToken(getState());
      const data = await createTransaction(formData, token);

      const txRaw = data?.transaction ?? data;
      const balance = data?.totalBalance ?? data?.balance;

      await dispatch(fetchTransactions());

      return { tx: normalizeTransaction(txRaw), balance };
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Add failed");
    }
  }
);

// EDIT
export const editTransaction = createAsyncThunk(
  "transactions/edit",
  async ({ id, payload }, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = selectToken(getState());
      const data = await updateTransaction({ id, ...payload }, token);

      const txRaw = data?.transaction ?? data;
      const balance = data?.totalBalance ?? data?.balance;

      await dispatch(fetchTransactions());

      return { tx: normalizeTransaction(txRaw), balance };
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Edit failed");
    }
  }
);

// DELETE
export const removeTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = selectToken(getState());
      const data = await deleteTransactionById(id, token);

      const balance = data?.totalBalance ?? data?.balance;

      await dispatch(fetchTransactions());

      return { id, balance };
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Delete failed");
    }
  }
);
