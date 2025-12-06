import React, { useState, useContext } from "react";
import "./Modal.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, cartItems, all_products, clearCart }) => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = getTotalCartAmount();
  const shipping = 4; // Costo fijo de envío
  const total = subtotal + shipping;

  const handleConfirm = async () => {
    if (!address) {
      alert("Por favor ingresa una dirección de entrega");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para realizar un pedido");
      navigate("/ingresar");
      return;
    }

    setLoading(true);
    const orderDetails = all_products
      .filter((product) => cartItems[product.id] > 0)
      .map((product) => ({
        productId: product.id,
        quantity: cartItems[product.id]
      }));

    const payload = {
      address: address,
      orderDetails: orderDetails
    };

    try {
      const res = await fetch("http://localhost:8080/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar el pedido");
      }

      alert("🦀 ¡Pedido realizado con éxito! Gracias por preferirnos.");
      
      if (clearCart) clearCart(); 
      
      onClose();
      navigate("/mispedidos");

    } catch (err) {
      console.error(err);
      alert("Hubo un problema: " + err.message);
    } finally {
      setLoading(false);
    }
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
            <strong>Total a Pagar</strong>
            <strong>${total}</strong>
          </div>
        </div>

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
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
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

        <button 
          className="confirm-btn" 
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Confirmar Pedido"}
        </button>
      </div>
    </div>
  );
};

export default Modal;