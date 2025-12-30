import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "/" : "https://wallet.b.goit.study";

export const userTransactionApi = axios.create({
  baseURL: BASE_URL,
});

export const setToken = (token) => {
  if (token) {
    userTransactionApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete userTransactionApi.defaults.headers.common.Authorization;
  }
};

const withToken = (token) => {
  if (token) setToken(token);
};

const toNumber = (v) => (v === "" || v == null ? 0 : Number(v));

export const normalizeTransaction = (t) => ({
  id: t.id ?? t._id,
  transactionDate: t.transactionDate ?? t.date ?? "",
  type: t.type,
  categoryId: t.categoryId ?? null,
  categoryName: t.categoryName ?? t.category ?? "",
  comment: t.comment ?? "",
  amount: toNumber(t.amount ?? t.sum),
});

export const fetchAllTransactions = async (token) => {
  withToken(token);

  try {
    const response = await userTransactionApi.get("/api/transactions");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching transactions:",
      error.response?.data || error
    );
    throw error;
  }
};

export const fetchAllTransactionsNormalized = async (token) => {
  const data = await fetchAllTransactions(token);

  const rawItems = data?.transactions ?? data ?? [];
  const items = rawItems.map(normalizeTransaction);

  const balance =
    data?.totalBalance ?? data?.balance ?? data?.currentBalance ?? 0;

  return { items, balance, raw: data };
};

export const createTransaction = async (transactionData, token) => {
  withToken(token);

  const payload = {
    transactionDate: transactionData.transactionDate,
    type: transactionData.type,
    categoryId: transactionData.categoryId ?? null,
    comment: transactionData.comment || "",
    amount: toNumber(transactionData.amount),
  };

  try {
    const response = await userTransactionApi.post(
      "/api/transactions",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error.response?.data || error);
    throw error;
  }
};

export const updateTransaction = async (transactionData, token) => {
  withToken(token);

  const { id: transactionId, ...updatePayload } = transactionData;

  if (!transactionId) {
    throw new Error("updateTransaction: transaction id is required");
  }

  const payload = {
    ...updatePayload,
    amount:
      updatePayload.amount != null ? toNumber(updatePayload.amount) : undefined,
  };

  try {
    const response = await userTransactionApi.patch(
      `/api/transactions/${transactionId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error.response?.data || error);
    throw error;
  }
};

export const deleteTransactionById = async (transactionId, token) => {
  withToken(token);

  try {
    const response = await userTransactionApi.delete(
      `/api/transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error.response?.data || error);
    throw error;
  }
};

export const fetchCategories = async (token) => {
  withToken(token);

  try {
    const response = await userTransactionApi.get(
      "/api/transaction-categories"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error);
    throw error;
  }
};
