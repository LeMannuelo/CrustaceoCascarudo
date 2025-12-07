import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  
  // CAMBIO 1: Iniciamos leyendo el localStorage. Si no hay nada, usa {}
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // CAMBIO 2: Cada vez que cartItems cambie, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. useEffect para hacer el GET al backend al cargar la app
  useEffect(() => {
    fetch('http://localhost:8080/product') // Tu endpoint
      .then((response) => response.json()) 
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  // 4. Funciones del carrito adaptadas para ser dinámicas
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: (prev[itemId] || 0) + 1 // Si no existe, empieza en 0 y suma 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: (prev[itemId] > 0 ? prev[itemId] - 1 : 0) 
    }));
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Buscamos el producto en la lista cargada del backend
        const itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        // Verificamos que itemInfo exista (por si el fetch no ha terminado)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_products, 
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;