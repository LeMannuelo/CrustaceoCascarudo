import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '@/Components/Assets/star_icon.png'
import starr_dull_icon from '@/Components/Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import AuthModal from '../AuthModal/AuthModal' 

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // GUARDIA DE SEGURIDAD:
    // Si entras directo a un link de producto, el fetch puede tardar 0.5 seg.
    // Si product es undefined, mostramos "Cargando..." o retornamos null para evitar crash.
    if (!product) {
        return <div className="loading">Cargando delicias del mar...</div>;
    }

    const handleAddToCart = () => {
        const usuario = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");

        if (!usuario || !token) {
            setShowAuthModal(true);
        } else {
            addToCart(product.id);
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                {/* Las imágenes ahora son rutas string, funcionan directo en src */}
                <img
                    className="productdisplay-main-img"
                    src={product.image} 
                    alt={product.name}
                />
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                
                {/* Estrellas estáticas (puedes dejarlas así por ahora) */}
                <div className="productdisplay-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={starr_dull_icon} alt="" />
                    <p>(12 reseñas)</p>
                </div>

                <div className="productdisplay-price">
                    <span className="price-label">Precio:</span>
                    {/* Aquí ya usabas .price, así que está PERFECTO */}
                    <span className="price-value">${product.price}</span>
                </div>
                
                {/* Resto del código igual... */}
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

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    )
}

export default ProductDisplay