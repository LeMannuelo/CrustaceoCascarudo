import React, { useContext, useEffect, useState } from "react";
import "./PedidosItems.css";
import { ShopContext } from "../../Context/ShopContext";

const PedidosItems = () => {
  const { all_products } = useContext(ShopContext); // Traemos el catálogo completo para buscar los nombres
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch de las órdenes (que vienen "crudas" con solo IDs)
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/order/active", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPedidos(Array.isArray(data) ? data : [data]);
        } else {
            console.error("Error trayendo pedidos:", response.status);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="pedidos-vacio"><h2>Cargando tus antojos... 🍔</h2></div>;
  }

  if (pedidos.length === 0) {
    return (
      <div className="pedidos-vacio">
        <h2>No tienes pedidos activos 🧾</h2>
      </div>
    );
  }

  return (
    <div className="pedidos-container">
      <h1>Mis Pedidos</h1>
      {pedidos.map((pedido, index) => {
        let totalPedidoCalculado = 0;

        return (
          <div className="pedido-card" key={pedido.id || index}>
            <div className="pedido-header">
              <h2>Pedido #{pedido.id || index + 1}</h2>
              <span className="estado">{pedido.status || "Procesando"} 🕒</span>
            </div>

            <div className="pedido-info">
              <p><strong>Dirección:</strong> {pedido.address}</p>
            </div>

            <div className="pedido-productos">
              <h3>Detalle:</h3>
              <ul>
                {pedido.orderDetails && pedido.orderDetails.map((detalle, i) => {
                  
                  const productoInfo = all_products.find(p => p.id === detalle.productId);

                  if (!productoInfo) return null;

                  const subtotal = productoInfo.price * detalle.quantity;
                  totalPedidoCalculado += subtotal;

                  const imagePath = productoInfo.image.startsWith('./') 
                      ? productoInfo.image.replace('./', '/images/') 
                      : productoInfo.image;

                  return (
                    <li key={i} className="pedido-item-li">
                      <div className="pedido-item-img">
                         <img src={imagePath} alt={productoInfo.name} />
                      </div>
                      <div className="pedido-item-txt">
                          {detalle.quantity} x {productoInfo.name} 
                          <span className="pedido-item-price"> — ${subtotal.toFixed(2)}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="pedido-footer">
                <h3>Total Estimado: ${totalPedidoCalculado.toFixed(2)}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PedidosItems;