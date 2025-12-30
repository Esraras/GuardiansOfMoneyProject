/*
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import currencyReducer from "../redux/currency/currencySlice.js";

const rootReducer = combineReducers({
  currency: currencyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
*/
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // 👈 localStorage

import currencyReducer from "./currency/currencySlice";

// 1️⃣ persist config
const persistConfig = {
  key: "root",
  storage,
};

// 2️⃣ root reducer
const rootReducer = combineReducers({
  currency: currencyReducer,
});

// 3️⃣ persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5️⃣ persistor
export const persistor = persistStore(store);
