import { Button, Drawer, HR } from "flowbite-react";
import { useCart } from "../hooks/useCart";
import FormatCLP from "./FormateadorCLP";
import { Alert } from "flowbite-react";
import { IoClose } from "react-icons/io5";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CartDrawer({ open, setIsOpen }) {
  const handleClose = () => setIsOpen(false);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    quantities,
    setQuantities,
    total,
    handleUpdateClick,
    handleQuantityChange,
    showAlert,
    setShowAlert,
  } = useCart();

  console.log(total);

  return (
    <Drawer open={open} onClose={handleClose} position="right" style={{ width: '400px' }}>
      <Drawer.Header title="" titleIcon={() => <></>} />
      {Object.keys(quantities).length === 0 ? (
        <Drawer.Items>
          <h1 className="text-center">Carro de compras vacío </h1>
        </Drawer.Items>
      ) : (
        <Drawer.Items>
          <h1 className="text-center text-xl py-4">Resumen</h1>
          {cart.map((item) => (
            <div key={item.id} className="p-2 flex items-center">
              <div className="flex flex-row gap-2 items-center justify-center border rounded-md p-4 w-full">
                <img
                  src={`${apiUrl}/uploads/${item.frontImage}`}
                  alt={item.nombreProd}
                  className="w-16 h-16 object-contain rounded mr-4"
                />
                <div className="flex flex-col items-center">
                  <h2 className="text-md uppercase font-normal text-center">
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
                      className="font-medium text-blue-500 dark:text-blue-700 hover:underline"
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
            </div>
          ))}

          <HR />
          <div>
            <h2 className="text-lg uppercase px-4 text-right font-bold">Total</h2>
            <div className="flex flex-row gap-2 items-center justify-between px-4">
              <div className="flex flex-col gap-2 justify-center">
                <h3>Pago Tarjetas</h3>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-lg">
                  <FormatCLP precio={total} />
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between px-4 pb-4">
              <div className="flex flex-col gap-2 justify-center">
                <h3>Pago Efectivo o Tarjetas</h3>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-lg">
                  <FormatCLP precio={total} />
                </p>
              </div>
            </div>
          </div>
          <HR />
          <div className="flex flex-col mx-auto gap-2">
            {showAlert && (
              <div className="my-4">
                <Alert color="success" onDismiss={() => setShowAlert(false)}>
                  <span className="font-medium">Información!</span> Cantidades
                  actualizadas correctamente
                </Alert>
              </div>
            )}

            <a
              type="button"
              className="justify-center flex flex-row text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              href={`/cart`}
            >
              Carro de Compras
            </a>
            <a
              type="button"
              className="justify-center flex flex-row text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              href={`/checkout`}
            >
              Finalizar Compra
            </a>
          </div>
        </Drawer.Items>
      )}
    </Drawer>
  );
}
