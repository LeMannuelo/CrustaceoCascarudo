import React, { useContext, useEffect, useState } from "react";
import "./PedidosItems.css";
import { ShopContext } from "../../Context/ShopContext";

// Ajusta el puerto si tu backend corre en otro (ej: 8080 o 3000)
const API_URL = "http://localhost:8080";

const PedidosItems = () => {
  const { all_products } = useContext(ShopContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch de las órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Usamos el endpoint para obtener pedidos (puede ser /order o /order/active según tu preferencia)
        const response = await fetch(`${API_URL}/order`, { 
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Ordenar: pedidos más nuevos primero
          const pedidosOrdenados = Array.isArray(data) 
            ? data.sort((a, b) => b.id - a.id) 
            : [data];
          setPedidos(pedidosOrdenados);
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

  // 2. Función para Cancelar Pedido (CORREGIDA)
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("¿Seguro que quieres cancelar este pedido?")) return;

    try {
      const token = localStorage.getItem("token");
      
      // CAMBIO CLAVE: Usamos PUT y la ruta /cancel/{id} definida en tu OrderController
      const response = await fetch(`${API_URL}/order/cancel/${orderId}`, {
        method: "PUT", 
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Pedido cancelado exitosamente.");
        // Lo removemos de la lista visualmente ya que se canceló
        setPedidos(prev => prev.filter(p => p.id !== orderId));
      } else {
        // Si falla, mostramos el estado para depurar
        console.error("Error del servidor:", response.status);
        alert("No se pudo cancelar. Verifica si el pedido ya está en camino.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión al intentar cancelar.");
    }
  };

  // Helper para mostrar estado bonito
  const getStatusLabel = (statusRaw) => {
    const s = statusRaw ? statusRaw.toUpperCase() : 'PENDIENTE';
    
    if (s === 'ENTREGADO' || s === 'DELIVERED') return '✅ Entregado';
    if (s === 'EN CAMINO' || s === 'OUT_FOR_DELIVERY') return '🛵 En camino';
    if (s.includes('PREPARA')) return '🍳 En preparación';
    if (s.includes('CANCEL')) return '❌ Cancelado';
    
    return '🕒 Pendiente'; 
  };

  // Helper ROBUSTO para calcular el total
  const calcularTotalSeguro = (pedido) => {
    // 1. Si el backend ya trae el total calculado
    if (pedido.total !== undefined && pedido.total !== null) {
        const val = parseFloat(pedido.total);
        if (!isNaN(val) && val > 0) return val;
    }

    // 2. Si no, calcular sumando items
    if (!pedido.orderDetails || !Array.isArray(pedido.orderDetails)) return 0;
    
    return pedido.orderDetails.reduce((acc, detalle) => {
        let precio = 0;

        if (detalle.price) {
            precio = parseFloat(detalle.price);
        } else if (detalle.product && detalle.product.price) {
            precio = parseFloat(detalle.product.price);
        } else if (all_products.length > 0) {
            const prod = all_products.find(p => p.id == detalle.productId); // Doble igual para coincidencia flexible (string/number)
            if (prod) precio = parseFloat(prod.price);
        }

        return acc + (precio * detalle.quantity);
    }, 0);
  };

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
      {pedidos.map((pedido) => {
        
        const statusUpper = (pedido.status || "PENDIENTE").toUpperCase();
        // Solo permitimos cancelar si está PENDIENTE
        const puedeCancelar = statusUpper === "PENDIENTE" || statusUpper === "PENDING";
        
        const totalDisplay = calcularTotalSeguro(pedido);

        return (
          <div className="pedido-card" key={pedido.id}>
            <div className="pedido-header">
              <h2>Pedido #{pedido.id}</h2>
              <span className={`estado ${statusUpper.includes('ENTREGADO') ? 'entregado' : ''}`}>
                {getStatusLabel(pedido.status)}
              </span>
            </div>

            <div className="pedido-info">
              <p><strong>Dirección:</strong> {pedido.address}</p>
            </div>

            <div className="pedido-productos">
              <h3>Detalle:</h3>
              <ul>
                {pedido.orderDetails && pedido.orderDetails.map((detalle, i) => {
                  
                  let nombreProducto = "Producto cargando...";
                  let precioUnitario = 0;
                  let imagen = "";

                  if (detalle.product) {
                    nombreProducto = detalle.product.name;
                    precioUnitario = parseFloat(detalle.product.price);
                    imagen = detalle.product.image;
                  } else {
                    const found = all_products.find(p => p.id == detalle.productId);
                    if (found) {
                        nombreProducto = found.name;
                        precioUnitario = parseFloat(found.price);
                        imagen = found.image;
                    }
                  }

                  const imagePath = imagen && imagen.startsWith('./') 
                      ? imagen.replace('./', '/images/') 
                      : imagen;

                  const subtotalItem = precioUnitario * detalle.quantity;

                  return (
                    <li key={i} className="pedido-item-li">
                      {imagePath && (
                          <div className="pedido-item-img">
                             <img src={imagePath} alt={nombreProducto} />
                          </div>
                      )}
                      <div className="pedido-item-txt">
                          <strong>{detalle.quantity} x {nombreProducto}</strong>
                          {precioUnitario > 0 && (
                             <span className="pedido-item-price"> — ${subtotalItem.toFixed(2)}</span>
                          )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="pedido-footer">
              <h3>Total: ${totalDisplay.toFixed(2)}</h3>
              
              {puedeCancelar && (
                  <button 
                    className="btn-cancelar-pedido"
                    onClick={() => handleCancelOrder(pedido.id)}
                  >
                    Cancelar Pedido
                  </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PedidosItems;