import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exchanges from "./pages/Exchanges";
import CoinDetail from "./pages/CoinDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="coins/:id" element={<CoinDetail />} />
        <Route path="/*" element={<h1>Error page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
