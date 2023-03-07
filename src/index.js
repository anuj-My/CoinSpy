import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CurrencyContextProvider from "./contexts/CurrencyContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import CoinContextProvider from "./contexts/CoinContextProvider";
import WatchListContextProvider from "./contexts/WatchListContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CurrencyContextProvider>
          <CoinContextProvider>
            <SearchContextProvider>
              <WatchListContextProvider>
                <App />
              </WatchListContextProvider>
            </SearchContextProvider>
          </CoinContextProvider>
        </CurrencyContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
