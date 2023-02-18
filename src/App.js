import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="exchanges" element={<h1>exchanges</h1>} />
        <Route path="coins/:coin" element={<h1>coin details</h1>} />
        <Route path="/*" element={<h1>Error page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
