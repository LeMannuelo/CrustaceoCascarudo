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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const sortedData = Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : [];
        setOrders(sortedData);
        setView("orders");
      } else {
        alert(`Error: ${response.status}`);
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
      const response = await fetch(`${API_URL}/order/${orderId}/status`, {
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }) 
      });

      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
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
    if (s.includes("ENTREGADO")) return { backgroundColor: "#d4edda", color: "#155724" }; 
    if (s.includes("CAMINO")) return { backgroundColor: "#cce5ff", color: "#004085" }; 
    if (s.includes("PREPARA")) return { backgroundColor: "#fff3cd", color: "#856404" }; 
    return { backgroundColor: "#f8d7da", color: "#721c24" }; 
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {view === "dashboard" && (
        <div className="admin-grid">
          <div className="admin-card">
            <h2>Productos 🍔</h2>
            <p>Gestionar menú.</p>
            <button onClick={() => alert("Próximamente")}>Gestionar</button>
          </div>

          <div className="admin-card">
            <h2>Pedidos 📦</h2>
            <p>Ver pedidos activos.</p>
            <button onClick={fetchOrders}>
                {loading ? "Cargando..." : "Ver pedidos"}
            </button>
          </div>

          <div className="admin-card">
            <h2>Usuarios 👥</h2>
            <p>Gestionar usuarios.</p>
            <button onClick={() => alert("Próximamente")}>Administrar</button>
          </div>
        </div>
      )}

      {view === "orders" && (
        <div className="orders-section">
            <div className="orders-header-row">
                <button className="back-btn" onClick={() => setView("dashboard")}>← Volver</button>
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
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="user-cell">
                            {/* El JSON trae el objeto user anidado: order.user.name */}
                            <span className="u-name">{order.user ? order.user.name : "Anónimo"}</span>
                            <span className="u-email">{order.user ? order.user.email : ""}</span>
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

                      <td className="total-cell">${order.amount}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={getStatusStyle(order.status)}
                        >
                          {order.status || "PENDING"}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="status-select"
                          value={order.status || "PENDING"} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="EN_PREPARACION">En preparación</option>
                          <option value="EN_CAMINO">En camino</option>
                          <option value="ENTREGADO">Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      )}

      {/* --- MODAL ADAPTADO AL NUEVO JSON --- */}
      {selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                <button className="admin-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
                
                <h3 style={{marginBottom: '15px', color: '#0b2772'}}>Pedido #{selectedOrder.id}</h3>
                
                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '5px'}}>📍 Dirección de entrega:</p>
                <div className="modal-address-box">
                    {selectedOrder.address}
                </div>

                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '5px'}}>📝 Productos:</p>
                <div className="modal-products-list">
                    {selectedOrder.orderDetails && selectedOrder.orderDetails.map((detail, index) => (
                        <div key={index} className="detail-row">
                            <div className="detail-info">
                                {/* AQUÍ ESTÁ LA CLAVE: Accedemos a detail.product.name */}
                                <span className="detail-name">
                                    {detail.product ? detail.product.name : "Producto desconocido"}
                                </span>
                                <span className="detail-qty">Cant: {detail.quantity}</span>
                            </div>
                            {/* Usamos el subtotal que ya viene calculado en el JSON */}
                            <span className="detail-price">
                                ${detail.subtotal}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{marginTop: '20px', textAlign: 'right', borderTop: '2px dashed #eee', paddingTop: '10px'}}>
                    <span style={{fontSize: '16px', fontWeight: 'bold', color: '#bb1e2d'}}>
                        Total: ${selectedOrder.amount}
                    </span>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Admin;