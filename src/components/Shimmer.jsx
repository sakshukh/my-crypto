import React from "react";

const Shimmer = () => {
  const shimmer = new Array(20).fill(1);

  return (
    <div className="card-container">
      {shimmer.map((item, index) => (
        <div className="card shimmer" key={index}></div>
      ))}
    </div>
  );
};

export default Shimmer;
