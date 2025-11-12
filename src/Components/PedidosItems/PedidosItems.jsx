import React, { useEffect, useState } from "react";
import "./PedidosItems.css";

const PedidosItems = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(data);
  }, []);

  if (pedidos.length === 0) {
    return (
      <div className="pedidos-vacio">
        <h2>No tienes pedidos activos ahora mismo 🧾</h2>
      </div>
    );
  }

  return (
    <div className="pedidos-container">
      <h1></h1>
      {pedidos.map((pedido) => (
        <div className="pedido-card" key={pedido.id}>
          <div className="pedido-header">
            <h2>Pedido #{pedido.id}</h2>
            <span className="estado">{pedido.estado}</span>
          </div>
          <div className="pedido-info">
            <p><strong>Dirección:</strong> {pedido.address}</p>
            <p><strong>Método de pago:</strong> {pedido.paymentMethod}</p>
            <p><strong>Total:</strong> ${pedido.total}</p>
          </div>
          <div className="pedido-productos">
            <h3>Productos:</h3>
            <ul>
              {pedido.productos.map((p, i) => (
                <li key={i}>{p.quantity}× {p.name} — ${p.price * p.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PedidosItems;
