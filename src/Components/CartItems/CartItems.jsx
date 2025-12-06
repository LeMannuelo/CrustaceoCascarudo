import React, { useContext, useState } from 'react';
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import remove from "../Assets/remove_A.png";
import Modal from "../Modal/Modal"; 

const CartItems = () => {
  const { getTotalCartAmount, all_products, cartItems, removeFromCart, clearCart } = useContext(ShopContext);
  const [showModal, setShowModal] = useState(false);

  // Verificar si el carrito está vacío
  const isCartEmpty = () => {
    return Object.values(cartItems).every(quantity => quantity === 0);
  };

  const handleCheckout = () => {
    if (isCartEmpty()) {
      alert("Arr! Tu carrito está vacío.");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Productos</p>
        <p>Título</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />

      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.price * cartItems[e.id]}</p>
                <img className="cartitems-remove-icon" src={remove} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Costos de envío</p>
              <p>Pendiente</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => setShowModal(true)}>Pasar al pago</button>
        </div>

        <div className="cartitems-promocode">
          <p>Si eres amigo de Bob Esponja, escribe tu nombre aquí</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Promo' />
            <button>Ingresar</button>
          </div>
        </div>
      </div>
              <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          cartItems={cartItems}
          all_products={all_products}
          clearCart={clearCart}
        />
    </div>
  );
};

export default CartItems;
