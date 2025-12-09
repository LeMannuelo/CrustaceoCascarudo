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

  // 2. Función para Cancelar Pedido
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("¿Seguro que quieres cancelar este pedido?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/order/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Pedido cancelado exitosamente.");
        // Actualizar la lista visualmente eliminando el pedido
        setPedidos(prev => prev.filter(p => p.id !== orderId));
      } else {
        alert("No se pudo cancelar (quizás ya está en camino o el estado no lo permite).");
      }
    } catch (error) {
      console.error("Error cancelando:", error);
      alert("Error de conexión al intentar cancelar.");
    }
  };

  // Helper para mostrar estado bonito (Normalización)
  const getStatusLabel = (statusRaw) => {
    // Convertimos a mayúsculas para comparar seguro
    const s = statusRaw ? statusRaw.toUpperCase() : 'PENDIENTE';
    
    if (s === 'ENTREGADO' || s === 'DELIVERED') return '✅ Entregado';
    if (s === 'EN CAMINO' || s === 'SHIPPED') return '🛵 En camino';
    if (s === 'EN PREPARACIÓN' || s === 'PREPARING' || s === 'EN PREPARACION') return '🍳 En preparación';
    if (s === 'CANCELADO' || s === 'CANCELLED') return '❌ Cancelado';
    
    return '🕒 Pendiente'; // Default
  };

  // Helper ROBUSTO para calcular el total
  const calcularTotalSeguro = (pedido) => {
    // 1. Si el backend ya trae el total calculado, úsalo.
    if (pedido.total !== undefined && pedido.total !== null) {
        const val = parseFloat(pedido.total);
        if (!isNaN(val) && val > 0) return val;
    }

    // 2. Si no, calcúlalo sumando los detalles manualmente
    if (!pedido.orderDetails || !Array.isArray(pedido.orderDetails)) return 0;
    
    return pedido.orderDetails.reduce((acc, detalle) => {
        let precio = 0;

        // Opción A: El detalle ya trae el precio (ideal)
        if (detalle.price) {
            precio = parseFloat(detalle.price);
        } 
        // Opción B: El detalle tiene el producto anidado
        else if (detalle.product && detalle.product.price) {
            precio = parseFloat(detalle.product.price);
        }
        // Opción C: Buscar en el catálogo global (all_products) del contexto
        else if (all_products.length > 0) {
            const prod = all_products.find(p => p.id === detalle.productId);
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
        
        // CORRECCIÓN: Normalizamos el estado para que la comparación funcione
        const statusUpper = (pedido.status || "PENDIENTE").toUpperCase();
        
        // Solo se puede cancelar si es PENDIENTE o EN PREPARACIÓN
        const puedeCancelar = statusUpper === "PENDIENTE" || statusUpper === "PENDING" || statusUpper === "EN PREPARACIÓN" || statusUpper === "EN PREPARACION";
        
        // Calculamos total seguro
        const totalDisplay = calcularTotalSeguro(pedido);

        return (
          <div className="pedido-card" key={pedido.id}>
            {/* Header de la tarjeta */}
            <div className="pedido-header">
              <h2>Pedido #{pedido.id}</h2>
              <span className={`estado ${statusUpper.includes('ENTREGADO') ? 'entregado' : ''}`}>
                {getStatusLabel(pedido.status)}
              </span>
            </div>

            {/* Dirección */}
            <div className="pedido-info">
              <p><strong>Dirección:</strong> {pedido.address}</p>
            </div>

            {/* Lista de productos */}
            <div className="pedido-productos">
              <h3>Detalle:</h3>
              <ul>
                {pedido.orderDetails && pedido.orderDetails.map((detalle, i) => {
                  
                  // LOGICA DE RESCATE DE DATOS (HYBRID)
                  let nombreProducto = "Producto cargando...";
                  let precioUnitario = 0;
                  let imagen = "";

                  // 1. Intentar leer del objeto anidado (si el backend lo manda)
                  if (detalle.product) {
                    nombreProducto = detalle.product.name;
                    precioUnitario = parseFloat(detalle.product.price);
                    imagen = detalle.product.image;
                  } 
                  // 2. Intentar buscar en el contexto global
                  else {
                    const found = all_products.find(p => p.id === detalle.productId);
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
                          {/* Mostrar precio solo si tenemos datos válidos */}
                          {precioUnitario > 0 && (
                             <span className="pedido-item-price"> — ${subtotalItem.toFixed(2)}</span>
                          )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Footer con Total y Botón */}
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