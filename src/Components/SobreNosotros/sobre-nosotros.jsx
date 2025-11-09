import React from 'react';
import "./sobre-nosotros.css";
import mapa from "../Assets/mapa.png";
import crustaceo from "../Assets/crustaceo.png";

const SobreNosotros = () => {
  return (
    <div className="nosotros-container">
      <h1 className="nosotros-titulo">NOSOTROS</h1>

      <div className="nosotros-contenido">
        <div className="nosotros-texto">
          <p>
            Founded by the incomparable Eugene H. Krabs, the Krusty Krab is
            more than just a restaurant—it’s a landmark built on quality,
            value, and the freshest ingredients the sea has to offer. Since
            opening our nautical doors, our mission has been simple: to
            provide a memorable, mouthwatering meal at a price that keeps the
            clams in your pocket.
          </p>
          <p>
            We take immense pride in our legendary culinary masterpiece, the
            Krabby Patty. This secret-recipe sensation has captivated taste
            buds across the ocean and remains the only item you'll ever need
            to order. Prepared with love and unparalleled dedication by our
            world-famous fry cook, the Krabby Patty is guaranteed to satisfy
            even the most demanding underwater appetite.
          </p>
          <p>
            <strong>Address:</strong> 831 Bottom Feeder Lane, Downtown Bikini
            Bottom, Pacific Ocean
          </p>

          <p>
            <strong>Hours of Operation:</strong>
            <br />
            <strong>Monday - Saturday:</strong> 8:00 AM – 8:00 PM — Perfect for
            breakfast, lunch, and early dinner.
            <br />
            <strong>Sunday:</strong> Closed, Mr. Krabs’ official day for
            counting money and relaxing.
            <br />
            <strong>Holiday:</strong> Closed on all major holidays. Clams saved
            are clams earned!
          </p>
        </div>

        <div className="nosotros-mapa">
          <img src={mapa} alt="Mapa del Crustáceo Cascarudo" />
        </div>
      </div>

      <div className="nosotros-imagen-inferior">
        <img src={crustaceo} alt="El Crustáceo Cascarudo" />
      </div>
    </div>
  );
};

export default SobreNosotros;
