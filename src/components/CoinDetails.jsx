import axios from "axios";
import { useState, useEffect } from "react";
import { COIN_URL } from "../constant";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import Chart from "./Chart";
import Error from "./Error";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState([]);
  const [days, setDays] = useState("24h");

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const params = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changeCurrency = (e) => {
    console.log(e);
    setCurrency(e.target.id);
    console.log(currency);
  };

  const changeDays = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365y");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${COIN_URL}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${COIN_URL}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoinDetails();
  }, [params.id, currency, days]);

  if (error) return <Error message="Error in loading coin" />;

  return (
    <div className="coin-detail">
      {" "}
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="center">
            <div className="chart">
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </div>
            <div className="days">
              {btns.map((item) => (
                <button key={item} onClick={() => changeDays(item)}>
                  {item}
                </button>
              ))}
            </div>
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
            <div className="date">{Date().split("G")[0]}</div>

            <img src={coin.image.large} alt={coin.id} />
            <text className="name">{coin.name}</text>
            <span>
              {currencySymbol}
              {coin.market_data.current_price[currency]}
            </span>
            <div className="upDown">
              {coin.market_data.market_cap_change_24h > 0 ? (
                <BiCaretUp fill="green" size="25px" />
              ) : (
                <BiCaretDown fill="red" size="25px" />
              )}
              {coin.market_data.market_cap_change_24h}
            </div>
            <button className="rank">#{coin.market_cap_rank}</button>
            <main>
              <div className="market-data">
                <p className="title">total supply</p>
                <p className="value">{coin.market_data.total_supply}</p>
              </div>
              <div className="market-data">
                <p className="title">circulating supply</p>
                <p className="value">{coin.market_data.circulating_supply}</p>
              </div>
              <div className="market-data">
                <p className="title">Market Cap</p>
                <p className="value">{`${currencySymbol}${coin.market_data.market_cap[currency]}`}</p>
              </div>
              <div className="market-data">
                <p className="title">All Time Low</p>
                <p className="value">{coin.market_data.atl[currency]}</p>
              </div>
              <div className="market-data">
                <p className="title">All Time Hight</p>
                <p className="value">{coin.market_data.ath[currency]}</p>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetails;
