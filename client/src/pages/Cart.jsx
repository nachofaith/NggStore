import Title from "../components/Title";
import { useCart } from "../hooks/useCart";
import FormatCLP from "../components/FormateadorCLP";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Resumen from "../components/Resumen";
const API_URL = import.meta.env.VITE_APIV2_URL;


const apiUrl = import.meta.env.VITE_API_URL;

export default function Carrito() {
  const {
    cart,
    removeFromCart,
    quantities,
    total,
    handleUpdateClick,
    handleQuantityChange,
    showAlert,
    setShowAlert,
  } = useCart();

  const isCartEmpty = cart.items.length === 0;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="md:container md:mx-auto h-screen">
      <Title text="Carro de compras" align="center" />
      {showAlert && (
        <div className="my-4 px-10">
          <Alert color="success" onDismiss={() => setShowAlert(false)}>
            <span className="font-medium">Información!</span> Cantidades
            actualizadas correctamente
          </Alert>
        </div>
      )}
      {isCartEmpty ? (
        <div className="text-center p-10 min-h-screen">
          <span className="text-4xl">Su carro esta vacío</span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-6  sm:px-10">
          <div className="col-span-3">
            <div className="flex flex-col gap-2">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="relative p-4 grid grid-cols-4 gap-2 border rounded-md items-center w-full"
                >
                  {/* Círculo rojo para cerrar */}
                  <div
                    className="absolute flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <IoClose className="w-6 h-6" />
                  </div>

                  <img
                    src={`${API_URL}/${item.frontImage}`}
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

                  {item.precioProdOff > 0 ? (
                    <div>
                      <h1>Pago con Tarjetas</h1>
                      <div className="flex flex-row">
                        <p className="font-normal text-xl line-through text-gray-400">
                          <FormatCLP precio={item.precioProd} />
                        </p>
                        <p className="font-normal text-2xl">
                          <FormatCLP precio={item.precioProdOff} />
                        </p>
                      </div>

                      <h1>Efectivo o Transferencias</h1>
                      <div className="flex - flex-row">
                        <p className="font-normal text-xl line-through text-gray-400">
                          <FormatCLP precio={item.precioProd} />
                        </p>
                        <p className="font-normal text-2xl">
                          <FormatCLP precio={item.precioProdOff} />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
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
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="h-auto">
            <Resumen onClick={handleClick} />
          </div>
        </div>
      )}
    </div>
  );
}
