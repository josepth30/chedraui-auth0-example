import React from "react";

import portada from "../assets/portada.png";

const Hero = () => (
  <div className="text-center">
    <img className="" src={portada} alt="React logo" width="500" />
    <h1 className="mb-3">Los mejores helados de la región</h1>

    <p className="lead">
      Desde 1975
    </p>
  </div>
);

export default Hero;
