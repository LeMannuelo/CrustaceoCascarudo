import React from 'react';
import "./preguntas-frecuentes.css";

const PreguntasFrecuentes = () => {
  return (
    <div className="faq-container">
      <div className="faq-item">
        <h1 className="faq-pregunta">
          ¿Cuál es la fórmula secreta de la Cangreburguer?
        </h1>
        <p className="faq-texto">
          La fórmula secreta de la Cangreburguer es
        </p>
      </div>

      <div className="faq-item">
        <h1 className="faq-pregunta">
          ¿Qué necesito para trabajar en el Crustáceo Cascarudo?
        </h1>
        <p className="faq-texto">
          ¡Te invitamos a ver el siguiente video!
        </p>

        <div className="faq-video">
          <iframe
            src="https://www.youtube.com/embed/Pblb2_mTfvI"
            title="El secreto de la Cangreburguer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
