import React, { useContext } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove from "../Assets/remove_A.png"

const CartItems = () => {
    const {getTotalCartAmount, all_products, cartItems, removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      {all_products.map((e)=>{
        if(cartItems[e.id]>0){
        return <div>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.precio}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.precio*cartItems[e.id]}</p>
                <img className="cartitems-remove-icon" src={remove} onClick={() =>{removeFromCart(e.id)}} alt="" />
            </div>
            <hr />
        </div>

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
              <p>Costos de envio</p>
              <p>Gratis!</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button> Pasar al pago</button>
        </div>
        <div className="cartitems-promocode">
          <p>Si eres amigo de Bob esponja, escribe tu nombre aqui</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder= 'Promo' />
            <button>Finalizar</button>
          </div>
        </div>
      </div>
        
            
    </div>
  )
}

export default CartItems;
