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
        <h2>LOREM IPSUM ONLY</h2>
        <div>
          <div className="hero-medusa-icon">
            <p>new</p>
            <img src={medusa} alt="" />
          </div>
          <p>lorem</p>
          <p>lorem ipsum</p>
        </div>
        <div className='hero-latest-btn'>
          <div>Latest Lorem</div>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={esponja} alt="" />
      </div>
    </div>
  );
};

export default Hero;
