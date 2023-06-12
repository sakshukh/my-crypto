import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import Header from "./components/Header";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";

import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/exchanges.scss";
import "./styles/coin-detail.scss";
import "./styles/media-query.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin-detail/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
