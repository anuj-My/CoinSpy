import { useState, createContext, useEffect } from "react";

export const CurrencyContext = createContext();

const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [code, setCode] = useState("en-IN");
  const [symbol, setSymbol] = useState("en-IN");

  const value = { currency, code, setCurrency, symbol };

  useEffect(() => {
    if (currency === "INR") {
      setCode("en-IN");
      setSymbol("₹");
    } else if (currency === "USD") {
      setCode("en-US");
      setSymbol("$");
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
