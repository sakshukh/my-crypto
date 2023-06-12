import React from "react";

const Exchange = ({ name, img, url, rank }) => {
  return (
    <a href={url} target="blank">
      <div className="card">
        <h5>{name}</h5>
        <img src={img} alt={name} />
        <p>{rank}</p>
      </div>
    </a>
  );
};

export default Exchange;
