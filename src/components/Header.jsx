import React from "react";
import neural from "../assets/neural.png";
import centure from "../assets/20centure.png";

const Header = () => (
  <header>
    <div className="d-flex flex-row px-14 mt-2 justify-content-between align-items-center">
      <img src={neural} alt="Neural IT Logo" width={200} height={65} />
      <img src={centure} alt="20 Centure Logo" width={80} height={70} />
    </div>
  </header>
);

export default Header;
