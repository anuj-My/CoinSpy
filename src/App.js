import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exchanges from "./pages/Exchanges";
import CoinDetail from "./pages/CoinDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { ProtectedSignUpRoutes } from "./pages/ProtectedRoutes";
import { ProtectedDashboardRoutes } from "./pages/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="coins/:id" element={<CoinDetail />} />

        <Route element={<ProtectedDashboardRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedSignUpRoutes />}>
          <Route path="auth" element={<Auth />} />
        </Route>
        <Route path="/*" element={<h1>Error page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
