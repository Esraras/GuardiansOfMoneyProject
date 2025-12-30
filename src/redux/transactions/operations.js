import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axiosConfig";
import { toast } from "react-toastify";

axiosConfig.setAxiosBaseURL();
axiosConfig.setAxiosHeader();

// *Add transaction //
const addTransaction = createAsyncThunk(
  "transactions/addTransaction",

  async (transactionData, thunkAPI) => {
    try {
      const response = await axios.post("/api/transactions", transactionData);

      toast.success("Transaction added successfully !");
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not saved. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// *Get all transaction //
const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/transactions");

      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not saved. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// *Delete transaction //
const deteleTransaction = createAsyncThunk(
  "transactions/deleteTransaction",

  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`);

      toast.success("Transaction deleted successfully !");
      return transactionId;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not deleted. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// *Modify transaction //
const modifyTransaction = createAsyncThunk(
  "transactions/modifyTransaction",

  async ({ transactionId, transactionData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/transactions/${transactionId}`,
        transactionData
      );

      toast.success("Transaction modified with succes!");
      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not modified. We are facing some technical problems with our servers ! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// *Get transactions summary //
const fetchTransactionsSummary = createAsyncThunk(
  "transactions/fetchTransactionsSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?month=${month}&year=${year}`
      );

      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Operation failed and transaction not saved. We are facing some technical problems with our servers ! `;
      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  fetchAllTransactions,
  addTransaction,
  deteleTransaction,
  fetchTransactionsSummary,
  modifyTransaction,
};
