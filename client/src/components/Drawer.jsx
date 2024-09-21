import { Button, Drawer, HR } from "flowbite-react";
import { useCart } from "../hooks/useCart";
import FormatCLP from "./FormateadorCLP";
import { useState, useEffect } from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CartDrawer({ open, setIsOpen }) {
  const handleClose = () => setIsOpen(false);
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState({});

  const [showToast, setShowToast] = useState(false);

  // Actualiza el estado de quantities cuando cambia el cart
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
   
  }, [cart]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
      setShowToast(false);
    }
  };

  // Función para actualizar la cantidad al hacer clic en el botón
  const handleUpdateClick = (id) => {
    updateQuantity(id, quantities[id]); // Actualiza la cantidad en el carrito
    setShowToast(true);
  };

  return (
    <Drawer open={open} onClose={handleClose} position="right">
      <Drawer.Header title="Resumen de Compra" titleIcon={() => <></>} />
      <Drawer.Items>
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-4 flex items-center justify-between border-t-2"
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={`${apiUrl}/uploads/${item.frontImage}`}
                alt={item.nombreProd}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex flex-col items-center">
                <h2 className="text-md uppercase font-normal">
                  {item.nombreProd}
                </h2>
                <span className="font-semibold text-gray-700">
                  {item.precioProdOff > 0 ? (
                    <FormatCLP
                      precio={item.precioProdOff * (quantities[item.id] || 1)} // Actualiza precio según cantidad
                    />
                  ) : (
                    <FormatCLP
                      precio={item.precioProd * (quantities[item.id] || 1)} // Actualiza precio según cantidad
                    />
                  )}
                </span>

                <div className="relative flex items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                    onClick={() =>
                      handleQuantityChange(item.id, quantities[item.id] - 1)
                    }
                  >
                    <svg
                      className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    className="text-center w-12 mx-2 border-0 bg-transparent"
                    value={quantities[item.id] || 0}
                    readOnly
                  />

                  <button
                    type="button"
                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                    onClick={() =>
                      handleQuantityChange(item.id, quantities[item.id] + 1)
                    }
                  >
                    <svg
                      className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-row gap-2">
                  <a
                    href="#"
                    onClick={() => handleUpdateClick(item.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Actualizar
                  </a>
                  <a
                    href="#"
                    onClick={() => removeFromCart(item.id)}
                    className="font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                </div>
              </div>
            </div>
            <HR />
          </div>
        ))}
        <HR />
        
      </Drawer.Items>

      <div className="flex flex-col mx-auto gap-2">
      {showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Datos actualizados.</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
        <Button href="/cart" color="blue">Carro de Compras</Button>
        <Button color="blue">Finalizar Compra</Button>
      </div>
     
    </Drawer>
  );
}
