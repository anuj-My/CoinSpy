import { useState, createContext, useEffect } from "react";
import { onAuthStateChangedListener } from "../api/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });

    return unSubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
