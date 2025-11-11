import React from 'react'
import { Link } from 'react-router-dom'
import "./Hero.css"
import esponja from "../Assets/esponja.png"
import medusa from "../Assets/medusa.png"
import arrow from "../Assets/arrow.png"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>¡EL COCINERO MÁS RAPIDO...</h2>
        <div>
          <div className="hero-medusa-icon">
            <p>De todo el fondo del mar!</p>
            <img src={medusa} alt="" />
          </div>
          <p></p>
          <p>Bob Esponja al servicio.</p>
        </div>
        <div className='hero-latest-btn'>
          <Link to="/menu" className="hero-latest-link">
          Visita nuestro menú
          <img src={arrow} alt="" />
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <img src={esponja} alt="" />
      </div>
    </div>
  );
};

export default Hero;
