import { Route, Routes } from "react-router-dom";
import { Coins, Home, CoinDetails } from "./components";
import { Exchanges } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/exchanges" element={<Exchanges />} />
      <Route path="/coins/:id" element={<CoinDetails />} />
      <Route path="/coins" element={<Coins />} />
    </Routes>
  );
}

export default App;
