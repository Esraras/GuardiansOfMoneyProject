
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "modern-normalize";
import "./index.css";

import App from "./components/App/App";

import { persistor, store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);