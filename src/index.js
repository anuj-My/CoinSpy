import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CurrencyContextProvider from "./contexts/CurrencyContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyContextProvider>
        <App />
      </CurrencyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
