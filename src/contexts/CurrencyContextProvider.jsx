import { useState, createContext, useEffect } from "react";

export const CurrencyContext = createContext();

const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [code, setCode] = useState("en-IN");
  const [symbol, setSymbol] = useState("en-IN");

  const value = { currency, code, setCurrency, symbol };

  useEffect(() => {
    switch (currency) {
      case "INR":
        setCode("en-IN");
        setSymbol("₹");
        break;
      case "USD":
        setCode("en-US");
        setSymbol("$");
        break;
      case "EUR":
        setCode("en-EU");
        setSymbol("Є");
        break;
      default:
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
