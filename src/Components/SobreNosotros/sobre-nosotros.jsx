import React from 'react';
import "./sobre-nosotros.css";
import mapa from "../Assets/mapa.png";
import crustaceo from "../Assets/crustaceo.png";

const SobreNosotros = () => {
  return (
    <div className="nosotros-container">
      <h1 className="nosotros-titulo">NOSOTROS</h1>


      <div className="nosotros-fila">
        <div className="nosotros-texto">
          <p>
            Fundado por el incomparable Eugene H. Cangrejo, El Crustáceo Cascarudo es más que un 
            simple restaurante: es un lugar emblemático construido sobre la calidad,
            el valor y los ingredientes más frescos que el mar puede ofrecer.
            Desde que abrimos nuestras náuticas puertas, nuestra misión ha sido sencilla: proporcionar una
            comida memorable y deliciosa a un precio que mantenga tus almejas en el bolsillo.
          </p>
          <p>
            Estamos inmensamente orgullosos de nuestra legendaria
            obra maestra culinaria, la Cangreburguer. Esta sensación 
            de receta secreta ha cautivado paladares por todo el océano 
            y sigue siendo el único artículo que necesitarás pedir.
            Preparada con amor y una dedicación inigualable por nuestro
            mundialmente famoso cocinero, ¡la Cangreburguer está 
            garantizada para satisfacer incluso el apetito submarino 
            más exigente!
          </p>
        </div>

        <div className="nosotros-imagen">
          <img src={crustaceo} alt="Mapa del Crustáceo Cascarudo" />
        </div>
      </div>

      {/* Segunda fila: imagen + texto */}
      <div className="nosotros-fila invertida">
        <div className="nosotros-imagen">
          <img src={mapa} alt="El Crustáceo Cascarudo" />
        </div>

        <div className="nosotros-texto">
          <p>
            <strong>Dirección:</strong> 831 Bottom Feeder Lane, Centro de Fondo de Bikini, Océano Pacífico
          </p>

          <p>
            <strong>Horario de Funcionamiento:</strong><br />
            <strong>Lunes - Sábado:</strong> 8:00 AM – 8:00 PM — Perfecto para desayuno, almuerzo y cena temprana.<br />
            <strong>Domingo:</strong> Cerrado, el día oficial del Sr. Cangrejo para contar dinero y relajarse.<br />
            <strong>Días Festivos:</strong> Cerrado en todos los días festivos principales. ¡Almejas ahorradas son almejas ganadas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
