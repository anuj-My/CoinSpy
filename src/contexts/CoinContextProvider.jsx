import axios from "axios";
import { useState, useContext, createContext } from "react";
import { CoinList } from "../api/coinGeckoApi";
import { CurrencyContext } from "./CurrencyContextProvider";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const { currency } = useContext(CurrencyContext);
  const [coinList, setCoinList] = useState([]);

  const getCoinList = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinList(data);
  };

  const value = { coinList, getCoinList };
  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};

export default CoinContextProvider;
