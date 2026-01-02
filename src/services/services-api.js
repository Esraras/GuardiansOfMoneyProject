import { userTransactionsApi } from "../api/userTransactionApi";

// Belirli bir dönem için işlem istatistiklerini getir
export const getTransactionSummary = async (params) => {
  const { data } = await userTransactionsApi.get("/api/transactions-summary", {
    params,
  });
  return data;
};

// Kategorileri getir
export const getCategories = async () => {
  const { data } = await userTransactionsApi.get("/api/transaction-categories");
  return data;
};

export const getTransactionsCategories = async () => {
  const { data } = await userTransactionsApi.get("/api/transaction-categories");
  return data;
};