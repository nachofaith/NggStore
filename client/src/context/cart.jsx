import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [ship, setShip] = useState(() => {
    // Recuperar información de envío de localStorage al montar el componente
    const storedShip = localStorage.getItem("ship");
    return storedShip ? JSON.parse(storedShip) : null;
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Efecto para guardar la opción de envío en localStorage cada vez que cambie
  useEffect(() => {
    if (ship) {
      localStorage.setItem("ship", JSON.stringify(ship));
    }
  }, [ship]);

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

  const handleUpdateClick = (id) => {
    updateQuantity(id, quantities[id]);
    setShowAlert(true);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const item = cart.find((product) => product.id === id);

    if (item) {
      const availableStock = item.stockProd;

      if (newQuantity > 0 && newQuantity <= availableStock) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: newQuantity,
        }));
        setShowAlert(false);
      } else if (newQuantity > availableStock) {
        // Manejo de cantidad que excede el stock
        null;
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);

      if (productInCart) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const newTotal = updatedCart.reduce((acc, item) => {
          const quantity = item.quantity;
          return (
            acc +
            (item.precioProdOff > 0
              ? item.precioProdOff * quantity
              : item.precioProd * quantity)
          );
        }, 0);
        setTotal(newTotal);
        return updatedCart;
      }

      const newCart = [...prevCart, { ...product, quantity: 1 }];

      const newTotal = newCart.reduce((acc, item) => {
        const quantity = item.quantity;
        return (
          acc +
          (item.precioProdOff > 0
            ? item.precioProdOff * quantity
            : item.precioProd * quantity)
        );
      }, 0);
      setTotal(newTotal);
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
        ship,
        setShip, // Ahora puedes usar setShip para actualizar la opción de envío en el resto de tu aplicación
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
