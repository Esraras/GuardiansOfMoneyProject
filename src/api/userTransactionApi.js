import axios from "axios";

export const userTransactionsApi = axios.create({
  baseURL: "https://wallet.b.goit.study",
});

export const setToken = (token) => {
  userTransactionsApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  delete userTransactionsApi.defaults.headers.common.Authorization;
};

userTransactionsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
