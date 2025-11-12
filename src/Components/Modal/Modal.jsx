import React, { useState, useContext } from "react";
import "./Modal.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, cartItems, all_products, clearCart }) => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo")
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = getTotalCartAmount();
  const shipping = 4;
  const total = subtotal + shipping;

  const handleConfirm = () => {
    if (!address) {
      alert("Por favor ingresa una dirección de entrega");
      return;
    }

    const productos = all_products
      .filter((p) => cartItems[p.id] > 0)
      .map((p) => ({
        name: p.name,
        quantity: cartItems[p.id],
        price: p.precio,
      }));

    const nuevoPedido = {
      id: Date.now(),
      productos,
      address,
      paymentMethod,
      subtotal,
      shipping,
      total,
      estado: "En preparación",
    };

    const pedidosPrevios = JSON.parse(localStorage.getItem("pedidos")) || [];
    localStorage.setItem("pedidos", JSON.stringify([...pedidosPrevios, nuevoPedido]));

    if (clearCart) clearCart();

    alert("🦀 Pedido confirmado. ¡Gracias por confiar en el Crustáceo Cascarudo!");
    onClose();
    navigate("/mispedidos");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Finalizar Pedido</h2>
        <p className="modal-subtitle">Tu orden está casi lista para salir del Crustáceo 🦀</p>

        <div className="modal-summary">
          <div className="modal-summary-item">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="modal-summary-item">
            <span>Costo de envío</span>
            <span>${shipping}</span>
          </div>
          <hr />
          <div className="modal-summary-item total">
            <strong>Total</strong>
            <strong>${total}</strong>
          </div>
        </div>

        {/* Dirección */}
        <div className="modal-section">
          <label>Dirección de entrega:</label>
          <input
            type="text"
            placeholder="Ej: Calle Concha N° 123, Fondo de Bikini"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {address && (
          <iframe
            className="modal-map"
            title="Mapa de entrega"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          ></iframe>
        )}

        <div className="modal-section">
          <label>Método de pago:</label>
          <div className="modal-payments">
            <button
              className={paymentMethod === "efectivo" ? "active" : ""}
              onClick={() => setPaymentMethod("efectivo")}
            >
              Efectivo
            </button>
            <button
              className={paymentMethod === "tarjeta" ? "active" : ""}
              onClick={() => setPaymentMethod("tarjeta")}
            >
              Tarjeta
            </button>
          </div>
        </div>

        <button className="confirm-btn" onClick={handleConfirm}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default Modal;
