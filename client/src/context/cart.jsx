import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cart, setCart] = useState(() => {
    // Recuperar carrito de localStorage al montar el componente
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => {
      const quantity = quantities[item.id] || 0;

      if (item.precioProdOff > 0) {
        return acc + item.precioProdOff * quantity;
      } else {
        return acc + item.precioProd * quantity;
      }
    }, 0);
    setTotal(newTotal);
  }, [total, cart]);

  // Función para actualizar la cantidad al hacer clic en el botón
  const handleUpdateClick = (id) => {
    updateQuantity(id, quantities[id]); // Actualiza la cantidad en el carrito
    setShowAlert(true);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const item = cart.find((product) => product.id === id);

    if (item) {
      const availableStock = item.stockProd; // Asegúrate de que `stock` esté disponible en el objeto del producto

      // Verifica que la nueva cantidad no exceda el stock y que sea mayor a 0
      if (newQuantity > 0 && newQuantity <= availableStock) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: newQuantity,
        }));
        setShowAlert(false);
      } else if (newQuantity > availableStock) {
        // Muestra un mensaje de error o alerta si la cantidad excede el stock
        null;
        // Aquí podrías mostrar un mensaje específico o manejar la alerta
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      
      if (productInCart) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        // Calcula el nuevo total
        const newTotal = updatedCart.reduce((acc, item) => {
          const quantity = item.quantity;
          return acc + (item.precioProdOff > 0 ? item.precioProdOff * quantity : item.precioProd * quantity);
        }, 0);
        setTotal(newTotal); // Actualiza el total
        return updatedCart;
      }
      
      // Si no está en el carrito, agrégalo con cantidad 1
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      
      // Calcula el nuevo total
      const newTotal = newCart.reduce((acc, item) => {
        const quantity = item.quantity;
        return acc + (item.precioProdOff > 0 ? item.precioProdOff * quantity : item.precioProd * quantity);
      }, 0);
      setTotal(newTotal); // Actualiza el total
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        quantities,
        total,
        setTotal,
        handleUpdateClick,
        handleQuantityChange,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
