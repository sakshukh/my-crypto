import axios from "axios";
import React, { useEffect, useState } from "react";
import { COIN_URL } from "../constant";
import Error from "./Error";
import Shimmer from "./Shimmer";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const pagination = new Array(132).fill(1);

  const changeCurrency = (e) => {
    console.log(e);
    setCurrency(e.target.value);
    console.log(currency);
  };

  const changeCoinPage = (index) => {
    setPage(index + 1);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${COIN_URL}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message={"error while fetching coins"} />;

  return (
    <div className="card-container">
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="radio">
            <input
              type="radio"
              name="currency"
              id="inr"
              value="inr"
              onChange={(e) => changeCurrency(e)}
              defaultChecked
            />
            <label htmlFor="inr">INR</label>
            <input
              type="radio"
              name="currency"
              id="usd"
              value="usd"
              onChange={(e) => changeCurrency(e)}
            />
            <label htmlFor="usd">USD</label>
            <input
              type="radio"
              name="currency"
              id="eur"
              value="eur"
              onChange={(e) => changeCurrency(e)}
            />
            <label htmlFor="eur">EUR</label>
          </div>
          {coins?.map((data) => (
            <CoinCard
              key={data.id}
              id={data.id}
              name={data.name}
              img={data.image}
              price={data.current_price}
              currencySymbol={currencySymbol}
            />
          ))}
          <div className="pagination">
            {pagination.map((item, index) => (
              <button key={index} onClick={() => changeCoinPage(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
