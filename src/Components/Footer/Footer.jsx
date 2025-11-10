import React from 'react';
import "./Footer.css"
import logo from "../Assets/KKlogo_A.png"
import instagram from "../Assets/instagram_A.png"
import wpp from "../Assets/whatsapp_A.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    < div className="footer">
        <div className='footer-logo'>
            <img src={logo} alt="" />
            <p>Crustáceo Cascarudo</p>
        </div>
        <ul className='footer-links'>
            <li><Link to ="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to ="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <img src={instagram} alt="" />
            </div>
            <div className='footer-icons-container'>
                <img src={wpp} alt="" />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr />
            <p>Marca registrada. Todos los derechos reservados</p>
        </div>
    </div>
  );
};

export default Footer;