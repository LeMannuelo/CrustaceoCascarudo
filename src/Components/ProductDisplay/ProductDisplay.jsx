import React from 'react'
import './ProductDisplay.css'
import star_icon from '@/Components/Assets/star_icon.png'
import starr_dull_icon from '@/Components/Assets/star_dull_icon.png'

const ProductDisplay = ({ product }) => {
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <img
          className="productdisplay-main-img"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-stars">
          <img src={star_icon} alt="estrella" />
          <img src={star_icon} alt="estrella" />
          <img src={star_icon} alt="estrella" />
          <img src={star_icon} alt="estrella" />
          <img src={starr_dull_icon} alt="estrella vacía" />
          <p>(12 reseñas)</p>
        </div>

        <div className="productdisplay-price">
          <span className="price-label">Precio:</span>
          <span className="price-value">${product.precio}</span>
        </div>

        <div className="productdisplay-description">
          <p>
            {product.description}
          </p>
        </div>

        <div className="productdisplay-detail">
          <p className="detail-tagline">
            Directamente desde Fondo de Bikini • Servido con amor y burbujas 
          </p>
        </div>

        <button className="add-to-cart-btn">Agregar al pedido</button>
      </div>
    </div>
  )
}

export default ProductDisplay
