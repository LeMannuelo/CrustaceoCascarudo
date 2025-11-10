import React from "react";
import "./Breadcrum.css";
import { Link } from "react-router-dom";
import arrow_icon from "@/Components/Assets/breadcrum_arrow.png";

const Breadcrum = ({ product }) => {
  if (!product) return null;

  return (
    <div className="breadcrum">
      <Link to="/" className="crumb-link">Inicio</Link>
      <img src={arrow_icon} alt="→" className="crumb-arrow" />

      <Link to="/menu" className="crumb-link">Menú</Link>
      <img src={arrow_icon} alt="→" className="crumb-arrow" />

      <Link to={`/menu?category=${product.category}`} className="crumb-link">
        {product.category}
      </Link>
      <img src={arrow_icon} alt="→" className="crumb-arrow" />

      <span className="crumb-current">{product.name}</span>
    </div>
  );
};

export default Breadcrum;
