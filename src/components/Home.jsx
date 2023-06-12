import React from "react";
import btc from "../assets/btc.png";

const Home = () => {
  return (
    <div className="home">
      <div className="circle">
        <img src={btc} alt="crypto" />
      </div>

      <text>XCrypto</text>
    </div>
  );
};

export default Home;
