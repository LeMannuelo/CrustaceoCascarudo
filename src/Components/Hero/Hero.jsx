import React from 'react'
import "./Hero.css"
import cangri1 from "../Assets/cangri1.png"
import cangri2 from "../Assets/cangri2.png"
import cangri3 from "../Assets/cangri3.png"

const Hero = () => {
  return (
    <div className="hero">
        <h1>Bienvenido al Crustáceo Cascarudo 🍔</h1>
        <p>¡Disfruta nuestras nuevas creaciones irresistibles!</p>
        <h2 className="hero-subtitle">Categorías Populares</h2>

        <div className="hero-burgers">
            <div className="burger-card">
                <img src={cangri1} alt="La Cangri" />
                <h3>La Cangri</h3>
            </div>

            <div className="burger-card">
                <img src={cangri2} alt="La Cangri 2" />
                <h3>Cangri doble carne</h3>
            </div>

            <div className="burger-card">
                <img src={cangri3} alt="La Cangri 3" />
                <h3>La verdadera Cangri </h3>
            </div>
        </div>
      <button>Ordenar Ahora</button>
    </div>

  );
};

export default Hero;
