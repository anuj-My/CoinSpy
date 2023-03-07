import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, createContext, useContext } from "react";
import { firestoreDb } from "../api/firebase";
import { UserContext } from "./UserContextProvider";

export const WatchListContext = createContext();

const WatchListContextProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [watchList, setWatchList] = useState([]);
  const value = { watchList, setWatchList };

  useEffect(() => {
    if (currentUser) {
      const coinRef = doc(firestoreDb, "watchlist", currentUser.uid);

      const unSubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        } else {
          console.log("no items inside the watchlist.");
        }
      });
      return () => {
        unSubscribe();
      };
    }
  }, [currentUser]);

  return (
    <WatchListContext.Provider value={value}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListContextProvider;
