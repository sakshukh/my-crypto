import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/exchanges">Exchanges</NavLink>
      </div>
      <div>
        <NavLink to="/coins">Coins</NavLink>
      </div>
    </nav>
  );
};

export default Header;
