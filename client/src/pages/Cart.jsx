import { useState, useEffect } from "react";
import Title from "../components/Title";
import { Card } from "flowbite-react";
import { useCart } from "../hooks/useCart";
import FormatCLP from "../components/FormateadorCLP";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const total = cart.reduce((acc, item) => {
    const quantity = quantities[item.id] || 0;
    return acc + item.precioProd * quantity;
  }, 0);

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
    <div className="md:container md:mx-auto h-screen">
      <Title text="Carro de compras" />
      {total === 0 ? (
        <div className="text-center p-10">
          <span className="text-4xl">Su carro esta vacío</span>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="basis-3/4">
            <div className="flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="relative p-4 grid grid-cols-4 gap-2 border rounded-md items-center w-full"
                >
                  {/* Círculo rojo para cerrar */}
                  <div
                    className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <IoClose className="h-4 w-4" />
                  </div>

                  <img
                    src={`${apiUrl}/uploads/${item.frontImage}`}
                    alt=""
                    className="w-40 h-40 object-contain p-2 mx-auto"
                  />

                  <div className="flex flex-col col-span-2">
                    <h5 className="mx-auto uppercase text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                      {item.nombreProd}
                    </h5>
                    <div className="relative flex items-center mx-auto">
                      <button
                        type="button"
                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] - 1)
                        }
                      >
                        <FaMinus className="h-2.5 w-2.5 text-gray-900" />
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
                        <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                    </div>
                    <div className="flex flex-row gap-2 mx-auto">
                      <a
                        href="#"
                        onClick={() => handleUpdateClick(item.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Actualizar
                      </a>
                    </div>
                  </div>

                  <span className="dark:text-gray-400 flex flex-col">
                    <span>Pago con Tarjetas</span>
                    <span className="font-normal text-2xl">
                      <FormatCLP precio={item.precioProd} />
                    </span>
                    <span>Efectivo o Transferencias</span>
                    <span className="font-normal text-2xl">
                      <FormatCLP precio={item.precioProd} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-96 border rounded-md basis-1/4">
            <h1 className="font-semibold text-xl uppercase text-center p-4">
              Resumen
            </h1>
            <div className="flex flex-row gap-2 justify-center">
              <span>TOTAL: </span>
              <span className="text-center">
                <FormatCLP precio={total} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
