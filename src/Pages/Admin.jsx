import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user || user.role_id !== 1) {
      navigate("/"); // Prohibido si no es admin
    }
  }, [navigate]);

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Productos</h2>
          <p>Ver, añadir o modificar los productos del menú.</p>
          <button>Gestionar</button>
        </div>

        <div className="admin-card">
          <h2>Pedidos</h2>
          <p>Revisar pedidos activos y su estado.</p>
          <button>Ver pedidos</button>
        </div>

        <div className="admin-card">
          <h2>Usuarios</h2>
          <p>Administrar usuarios registrados.</p>
          <button>Administrar</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
