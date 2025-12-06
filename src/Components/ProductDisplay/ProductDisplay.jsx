import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '@/Components/Assets/star_icon.png'
import starr_dull_icon from '@/Components/Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../AuthModal/AuthModal' // Crearemos este componente

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleAddToCart = () => {
        // Verificar si hay usuario autenticado
        const usuario = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");

        if (!usuario || !token) {
            // No está autenticado, mostrar modal
            setShowAuthModal(true);
        } else {
            // Está autenticado, agregar al carrito
            addToCart(product.id);
        }
    };

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
                    <span className="price-value">${product.price}</span>
                </div>

                <div className="productdisplay-description">
                    <p>{product.description}</p>
                </div>

                <div className="productdisplay-detail">
                    <p className="detail-tagline">
                        Directamente desde Fondo de Bikini • Servido con amor y burbujas 
                    </p>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Agregar al pedido
                </button>
            </div>

            {/* Modal de autenticación */}
            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    )
}

export default ProductDisplay