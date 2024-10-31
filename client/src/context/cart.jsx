import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0); // Inicializa el total en 0
  const [showAlert, setShowAlert] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // Estado para el método de pago seleccionado

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [], ship: null, payment: "" };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const initialQuantities = cart.items.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);

    const initialTotal = cart.items.reduce((acc, item) => {
      const productTotal = item.precioProdOff > 0
        ? item.precioProdOff * item.quantity
        : item.precioProd * item.quantity;
      return acc + productTotal;
    }, 0);

    const shippingCost = cart.ship?.priceShipp ? cart.ship.priceShipp : 0;
    setTotal(initialTotal + shippingCost);
  }, [cart.items, cart.ship]);

  const handleUpdateClick = () => {
    cart.items.forEach((item) => {
      const newQuantity = quantities[item.id] || item.quantity;
      if (newQuantity !== item.quantity) {
        updateQuantity(item.id, newQuantity);
      }
    });

    const newTotal = cart.items.reduce((acc, item) => {
      const quantity = quantities[item.id] || item.quantity;
      const productTotal = item.precioProdOff > 0
        ? item.precioProdOff * quantity
        : item.precioProd * quantity;
      return acc + productTotal;
    }, 0);

    const shippingCost = cart.ship?.priceShipp ? cart.ship.priceShipp : 0;
    setTotal(newTotal + shippingCost);
    setShowAlert(true);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const item = cart.items.find((product) => product.id === id);

    if (item) {
      const availableStock = item.stockProd;

      if (newQuantity > 0 && newQuantity <= availableStock) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: newQuantity,
        }));
        setShowAlert(false);
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.items.find((item) => item.id === product.id);

      if (productInCart) {
        const updatedItems = prevCart.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...prevCart, items: updatedItems };
      }

      return { ...prevCart, items: [...prevCart.items, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== id),
    }));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  const setShip = (ship) => {
    setCart((prevCart) => ({
      ...prevCart,
      ship: ship,
    }));
  };

  // Función para actualizar el método de pago
  const setPayment = (payment) => {
    setPaymentMethod(payment);
    setCart((prevCart) => ({
      ...prevCart,
      payment: payment,
    }));
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
        setShip,
        paymentMethod, // Método de pago seleccionado
        setPayment, // Función para actualizar el método de pago
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
