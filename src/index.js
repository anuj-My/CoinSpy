import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CurrencyContextProvider from "./contexts/CurrencyContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyContextProvider>
        <SearchContextProvider>
            <App />
        </SearchContextProvider>
      </CurrencyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
