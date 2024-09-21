import FormatCLP from "./FormateadorCLP";
import { Link } from "react-router-dom";
import CartDrawer from "./Drawer";
import { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useCart } from "../hooks/useCart";

export function Products(props) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    tipo,
    nombreProd,
    precioProd,
    precioProdOff,
    frontImage,
    id,
    onClick, // recibir la prop `onClick`
  } = props;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddClick = (e) => {
    e.preventDefault();
    if (isProductInCart) {
      // removeFromCart(id);
      setIsOpen(true); 
    } else {
      addToCart({ id, nombreProd, precioProd, precioProdOff, frontImage });
    }
    setIsOpen(true); // Abrir el Drawer
  };

  const { addToCart, removeFromCart, cart } = useCart();

  const isProductInCart = cart.some((item) => item.id === id);

  return (
    <>
      <div className="hover:shadow-blue-500/50 transition hover:scale-105 hover:shadow-xl text-center flex flex-col align-middle max-w-sm border rounded-lg shadow pt-2">
        <Link
          to={`/producto/${id}`}
          className="flex flex-col h-full "
        >
          {tipo === "news" && (
            <div>
              <span className="bg-green-600 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                Nuevo
              </span>
            </div>
          )}
          {tipo === "off" && (
            <div>
              <span className="bg-red-700 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                Oferta
              </span>
            </div>
          )}
          <div className="flex-grow mx-auto block overflow-hidden rounded-lg flex justify-center items-center">
            <img
              className="w-[300px] h-[300px] object-contain rounded-t-lg"
              src={`${apiUrl}/uploads/${frontImage}`}
              alt="Product Image"
            />
          </div>

          <div className="p-5 flex-col flex flex-grow">
            <h5 className=" uppercase mb-2 text-2xl font-semibold tracking-tight text-gray-800">
              {nombreProd}
            </h5>

            <div className="flex items-center space-x-1 rtl:space-x-reverse mx-auto ">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>

            {precioProdOff != 0 ? (
              <div className="flex flex-row mx-auto py-4">
                <span className="text-lg font-normal text-gray-400 line-through dark:text-white">
                  {<FormatCLP precio={precioProd} />}
                </span>
                <span className="ms-3 text-xl font-semibold text-gray-800 dark:text-white">
                  {<FormatCLP precio={precioProdOff} />}
                </span>
              </div>
            ) : (
              <div className="flex flex-row mx-auto py-4">
                <span className="ms-3 text-xl font-semibold text-gray-800 dark:text-white">
                  {<FormatCLP precio={precioProd} />}
                </span>
              </div>
            )}
          </div>

          {/* Botones alineados al final */}
          <div className="mt-auto flex flex-row gap-2 justify-center p-4">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center "
              href={`/producto/${id}`}
              onClick={onClick}
            >
              Saber más
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              type="button"
              className={
                isProductInCart
                  ? `text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`
                  : `text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center`
              }
              onClick={handleAddClick}
            >
              {isProductInCart ? (
                <BsFillCartCheckFill className="h-5 w-5" />
              ) : (
                <BsCartPlus className="h-5 w-5" />
              )}
            </button>
          </div>
        </Link>
      </div>
      <CartDrawer open={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
