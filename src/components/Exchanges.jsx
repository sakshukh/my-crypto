import axios from "axios";
import React, { useEffect, useState } from "react";
import { COIN_URL } from "../constant";
import Error from "./Error";
import Shimmer from "./Shimmer";
import Exchange from "./Exchange";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(`${COIN_URL}/exchanges`);
      setExchanges(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  if (error) return <Error message="error while fetching exchanges" />;

  return (
    <div className="card-container">
      {loading ? (
        <Shimmer />
      ) : (
        exchanges?.map((data) => (
          <Exchange
            key={data.id}
            name={data.name}
            img={data.image}
            url={data.url}
            rank={data.trust_score_rank}
          />
        ))
      )}
    </div>
  );
};

export default Exchanges;
