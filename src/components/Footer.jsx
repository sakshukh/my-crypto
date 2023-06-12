import React from "react";
import { RxAvatar } from "react-icons/rx";

const Footer = () => {
  return (
    <footer>
      <div>
        <h3>About Us</h3>
        <span>
          We are the best crypto trading app in India, we provide our guidance
          at a very cheap price.
        </span>
      </div>
      <div className="avatar">
        <RxAvatar size="50px" />
        <text>Our Founder</text>
      </div>
    </footer>
  );
};

export default Footer;
