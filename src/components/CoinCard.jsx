import React from "react";
import { NavLink } from "react-router-dom";

const CoinCard = ({ name, img, id, price, currencySymbol }) => {
  return (
    <NavLink to={`/coin-detail/${id}`}>
      <div className="card">
        <h5>{name}</h5>
        <img src={img} alt={name} />
        <span>
          {currencySymbol}
          {price}
        </span>
      </div>
    </NavLink>
  );
};

export default CoinCard;
