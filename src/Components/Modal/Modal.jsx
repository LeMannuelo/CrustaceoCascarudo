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
  const shipping = 4;
  const total = subtotal + shipping;

  const handleConfirm = async () => {
    if (!address) {
      alert("Por favor ingresa una dirección de entrega");
      return;
    }

    // Obtener datos del usuario autenticado
    const usuarioData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!usuarioData || !token) {
      alert("Debes iniciar sesión para realizar un pedido");
      navigate("/ingresar");
      return;
    }

    const usuario = JSON.parse(usuarioData);

    // Preparar productos del pedido
    const productos = all_products
      .filter((p) => cartItems[p.id] > 0)
      .map((p) => ({
        producto_id: p.id,
        name: p.name,
        cantidad: cartItems[p.id],
        precio: p.price,
      }));

    const pedidoData = {
      usuario_id: usuario.id, // o usuario.email según tu BD
      productos,
      direccion_envio: address,
      metodo_pago: paymentMethod,
      subtotal,
      costo_envio: shipping,
      total,
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Importante: enviar el token
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al crear el pedido");
        setLoading(false);
        return;
      }

      // Guardar pedido localmente para historial (opcional)
      const pedidosPrevios = JSON.parse(localStorage.getItem("pedidos")) || [];
      localStorage.setItem("pedidos", JSON.stringify([...pedidosPrevios, data.pedido]));

      // Limpiar carrito
      if (clearCart) clearCart();

      alert("🦀 Pedido confirmado. ¡Gracias por confiar en el Crustáceo Cascarudo!");
      onClose();
      navigate("/mispedidos");

    } catch (err) {
      alert("Error comunicándose con el servidor");
      console.error(err);
    }

    setLoading(false);
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

        <button 
          className="confirm-btn" 
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar Pedido"}
        </button>
      </div>
    </div>
  );
};

export default Modal;