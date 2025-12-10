import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admin.css";

const API_URL = "http://localhost:8080";

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/order/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sortedData = Array.isArray(data)
          ? data.sort((a, b) => b.id - a.id)
          : [];
        setOrders(sortedData);
        setView("orders");
      } else {
        alert(`Error al cargar pedidos: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error de conexión.");
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/order/${orderId}?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert("Error al actualizar estado.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusStyle = (status) => {
    const s = status ? status.toUpperCase() : "";

    switch (s) {
      case "PENDING":
        return { backgroundColor: "#eee", color: "#333" };

      case "PREPARATION":
        return { backgroundColor: "#fff3cd", color: "#856404" };

      case "OUT_FOR_DELIVERY":
        return { backgroundColor: "#cce5ff", color: "#004085" };

      case "DELIVERED":
        return { backgroundColor: "#d4edda", color: "#155724" };

      case "CANCELED":
        return { backgroundColor: "#f8d7da", color: "#721c24" };

      default:
        return { backgroundColor: "#eee", color: "#333" };
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración </h1>

      {view === "dashboard" && (

          <div className="admin-card">
            <h2>Pedidos 📦</h2>
            <p>Ver pedidos activos.</p>
            <button onClick={fetchOrders}>
              {loading ? "Cargando..." : "Ver pedidos"}
            </button>
          </div>

      )}

      {view === "orders" && (
        <div className="orders-section">
          <div className="orders-header-row">
            <button className="back-btn" onClick={() => setView("dashboard")}>
              ← Volver
            </button>
            <h2>Gestión de Pedidos</h2>
          </div>

          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Detalles</th>
                  <th>Total</th>
                  <th>Estado Actual</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const statusUpper = order.status
                    ? order.status.toUpperCase()
                    : "PENDING";

                  const isCancelled = statusUpper === "CANCELED";
                  const isDelivered = statusUpper === "DELIVERED";

                  return (
                    <tr key={order.id} className={isCancelled ? "row-cancelled" : ""}>
                      <td>
                        <strong>#{order.id}</strong>
                      </td>

                      <td>
                        <div className="user-cell">
                          <span className="u-name">
                            {order.user ? order.user.name : "Anónimo"}
                          </span>
                          <span className="u-email">
                            {order.user ? order.user.email : ""}
                          </span>
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn-details"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Ver
                        </button>
                      </td>

                      <td className="total-cell">${order.amount || order.total}</td>

                      <td>
                        <span
                          className="status-badge"
                          style={getStatusStyle(order.status)}
                        >
                          {order.status || "PENDING"}
                        </span>
                      </td>

                      <td>
                        {isCancelled ? (
                          <span className="action-locked">🚫 Cancelado</span>
                        ) : (
                          <select
                            className="status-select"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            disabled={isDelivered}
                          >
                            <option value="PENDING">Pendiente</option>
                            <option value="PREPARATION">Preparación</option>
                            <option value="OUT_FOR_DELIVERY">En reparto</option>
                            <option value="DELIVERED">Entregado</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="no-data">
                <p>No se encontraron pedidos en el sistema.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedOrder && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="admin-modal-close"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h3 className="modal-title">Pedido #{selectedOrder.id}</h3>

            <div className="modal-section">
              <p className="modal-label">📍 Dirección:</p>
              <p className="modal-value">{selectedOrder.address}</p>
            </div>

            <div className="modal-section">
              <p className="modal-label">📝 Productos:</p>
              <div className="modal-products-list">
                {selectedOrder.orderDetails &&
                  selectedOrder.orderDetails.map((detail, index) => (
                    <div key={index} className="detail-row">
                      <div className="detail-info">
                        <span className="detail-name">
                          {detail.product
                            ? detail.product.name
                            : "Producto desconocido"}
                        </span>
                        <span className="detail-qty">Cant: {detail.quantity}</span>
                      </div>
                      <span className="detail-price">
                        ${detail.subtotal || detail.price * detail.quantity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="modal-total-section">
              <span>Total:</span>
              <span>${selectedOrder.amount || selectedOrder.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
