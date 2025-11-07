import React from 'react'
import { Link } from 'react-router-dom'
import "./Hero.css"
import cangri2 from "../Assets/cangri2.png"
import acompañamientos from "../Assets/acompañamientos.png"
import malteadas from "../Assets/malteadas.png"

const Hero = () => {
  return (
    <div className="hero">

      <h1>Bienvenido al Crustáceo Cascarudo 🍔</h1>
      <p>¡Disfruta nuestras nuevas creaciones irresistibles!</p>
      
      <div className="hero-header">
        <h2 className="hero-subtitle">Categorías Populares</h2>
        <Link to="/menu" className="hero-view-all">Ver todo</Link>
      </div>

      <div className="hero-burgers">
        <div className="burger-card">
          <img src={acompañamientos} alt="La Cangri" />
          <h3>Acompamientos</h3>
        </div>

        <div className="burger-card">
          <img src={cangri2} alt="La Cangri 2" />
          <h3>Cangri doble carne</h3>
        </div>

        <div className="burger-card">
          <img src={malteadas} alt="La Cangri 3" />
          <h3>Malteadas</h3>
        </div>
      </div>
      <Link to="/ordenar">
            <button>Ordenar Ahora</button>
      </Link>
    </div>
  );
};

export default Hero;
