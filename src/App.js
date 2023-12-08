import { useContext, useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContextProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import Exchanges from "./pages/Exchanges";
import CoinDetail from "./pages/CoinDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const ProtectDashboardRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const ProtectAuthRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return isLoading ? (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RiseLoader
        color="#6e46ff"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="coins/:id" element={<CoinDetail />} />

        <Route
          path="dashboard"
          element={
            <ProtectDashboardRoute>
              <Dashboard />
            </ProtectDashboardRoute>
          }
        />

        <Route
          path="auth"
          element={
            <ProtectAuthRoute>
              <Auth />
            </ProtectAuthRoute>
          }
        />

        <Route
          path="/*"
          element={<h1 style={{ fontSize: "20rem" }}>Error page</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
