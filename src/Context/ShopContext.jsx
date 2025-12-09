import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  
  // --- 1. GESTIÓN DEL CARRITO ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- 2. GESTIÓN DE USUARIO (RESTAURADO) ---
  // Esto es vital para que la Navbar se actualice sola al loguearte/desloguearte
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUser(null);
    setCartItems({});
  };

  // --- 3. FETCH DE PRODUCTOS (CORREGIDO) ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Preparamos los headers
        const headers = {
          "Content-Type": "application/json",
        };

        // CORRECCIÓN CLAVE: Solo enviamos el token si realmente existe.
        // Enviar "Bearer null" hace que el backend bloquee la petición.
        if (token && token !== "null" && token !== "undefined") {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:8080/product", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // --- 4. FUNCIONES DEL CARRITO ---
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: (prev[itemId] || 0) + 1 
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
        const itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
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
    // Agregamos de nuevo las funciones de usuario al contexto
    user,
    login,
    logout
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;