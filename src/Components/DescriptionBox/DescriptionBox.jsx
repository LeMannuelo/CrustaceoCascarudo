import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Reseña del crítico</div>
        <div className="descriptionbox-nav-box fade">Reseñas (12)</div>
      </div>

      <div className="descriptionbox-description">
        <p>
          En el fondo del océano, el Crustáceo Cascarudo se alza como un refugio para los amantes del buen sabor. 
          Su plato estrella, la <em>Cangreburger</em>, combina una textura perfecta con ese inconfundible aroma a felicidad recién cocinada. 
          Es evidente que cada receta es tratada con el mismo cuidado con que Bob Esponja limpia su espátula.
        </p>
        <p>
          El ambiente es cálido, familiar y lleno de burbujas; un lugar donde los sabores se mezclan con la alegría del servicio. 
          Sin duda, un rincón marino que logra que incluso los más exigentes bajen la guardia y sonrían. Recomiendo cada uno de sus platillos, cada uno es una joya culinaria con pasión submarina. 
        </p>
        <p>— Róbalo Burbuja, Crítico Gastronómico</p>
      </div>
    </div>
  )
}

export default DescriptionBox
