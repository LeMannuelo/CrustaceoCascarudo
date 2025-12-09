import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admin.css";

// Ajusta si tu backend tiene un endpoint diferente
const API_URL = "http://localhost:8080"; 

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("dashboard"); // 'dashboard' | 'orders'

  // Verificar si es ADMIN al cargar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    // Seguridad básica en frontend
    if (!user || user.role !== "ADMIN") {
      navigate("/"); 
    }
  }, [navigate]);

  // Función para obtener TODOS los pedidos
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
        // Ordenar por ID descendente
        const sortedData = Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : [];
        setOrders(sortedData);
        setView("orders");
      } else {
        if (response.status === 403) {
            alert("Acceso denegado (403). Tu usuario ADMIN no tiene permiso para ver este endpoint.");
        } else {
            alert(`Error al cargar pedidos: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  // Función para cambiar el estado del pedido
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
        alert("No se pudo actualizar el estado.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Estilos dinámicos para las etiquetas de estado
  const getStatusStyle = (status) => {
    const s = status ? status.toUpperCase() : "";
    if (s.includes("ENTREGADO")) return { backgroundColor: "#d4edda", color: "#155724" }; // Verde
    if (s.includes("CAMINO")) return { backgroundColor: "#cce5ff", color: "#004085" }; // Azul
    if (s.includes("PREPARA")) return { backgroundColor: "#fff3cd", color: "#856404" }; // Amarillo
    return { backgroundColor: "#f8d7da", color: "#721c24" }; // Rojo/Default
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración 🛡️</h1>

      {/* --- DASHBOARD (TARJETAS) --- */}
      {view === "dashboard" && (
        <div className="admin-grid">
          <div className="admin-card">
            <h2>Productos 🍔</h2>
            <p>Ver, añadir o modificar los productos del menú.</p>
            <button onClick={() => alert("Funcionalidad en construcción")}>Gestionar</button>
          </div>

          <div className="admin-card">
            <h2>Pedidos 📦</h2>
            <p>Revisar pedidos activos, cambiar estados y envíos.</p>
            <button onClick={fetchOrders}>
                {loading ? "Cargando..." : "Ver pedidos"}
            </button>
          </div>

          <div className="admin-card">
            <h2>Usuarios 👥</h2>
            <p>Administrar usuarios registrados en la plataforma.</p>
            <button onClick={() => alert("Funcionalidad en construcción")}>Administrar</button>
          </div>
        </div>
      )}

      {/* --- VISTA DE TABLA DE PEDIDOS --- */}
      {view === "orders" && (
        <div className="orders-section">
            <div className="orders-header-row">
                <button className="back-btn" onClick={() => setView("dashboard")}>← Volver al Panel</button>
                <h2>Gestión de Pedidos</h2>
            </div>
            
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Total</th>
                    <th>Estado Actual</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="user-cell">
                            <span className="u-name">{order.user ? order.user.name : "Usuario #" + order.userId}</span>
                            <span className="u-email">{order.user ? order.user.email : ""}</span>
                        </div>
                      </td>
                      <td className="address-cell">{order.address}</td>
                      <td className="total-cell">${order.amount}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={getStatusStyle(order.status)}
                        >
                          {order.status || "Pendiente"}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="status-select"
                          value={order.status || "Pendiente"} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En preparación">En preparación</option>
                          <option value="En camino">En camino</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
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
    </div>
  );
};

export default Admin;