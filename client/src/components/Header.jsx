import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import { Spinner } from "flowbite-react";
import { BsCartFill } from "react-icons/bs";
import { useCart } from "../hooks/useCart";
import { FaUser } from "react-icons/fa";
import CartDrawer from "./Drawer";

export default function Header() {
  const { dataCat } = useRead();
  const [loading, setLoading] = useState(true);
  const { cart } = useCart(); // cart ahora tiene la estructura { items: [], ship: {} }
  const [isOpen, setIsOpen] = useState(false);

  // Cambiar el acceso a cart.items para el cálculo
  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (dataCat !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setLoading(false);
    }
  }, [dataCat]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 lg:px-10 pb-10">
        <nav className="text-gray-600 flex flex-col lg:flex-row justify-between items-center p-4">
          <a href="/" className="w-full lg:w-auto">
            <div id="logo" className="flex flex-row items-end gap-2 pb-4">
              <img
                className="h-12 lg:h-20"
                src="/src/assets/logo.webp"
                alt="NGG Store Logo"
              />
              <h1 className="text-4xl lg:text-6xl flex flex-row gap-1">
                <span className="text-gray-800 font-bebas">NGG</span>
                <span className="font-bebas text-gray-400">STORE</span>
              </h1>
            </div>
          </a>

          <ul className="text-gray-800 tracking-tighter gap-4 lg:gap-8 uppercase text-sm lg:text-xl justify-center mx-auto flex flex-wrap items-center pb-4 lg:pb-0">
            <li className="hover:text-blue-400">
              <Dropdown
                label={
                  loading ? (
                    <span className="flex items-center">
                      <Spinner aria-label="Loading spinner" size="sm" />
                      <span className="pl-3">Cargando...</span>
                    </span>
                  ) : (
                    "CATEGORÍAS"
                  )
                }
                dismissOnClick={false}
                inline
              >
                {!loading &&
                  dataCat
                    .sort((a, b) => a.nombre_cat.localeCompare(b.nombre_cat))
                    .map((category) => (
                      <div key={category.id_cat} className="relative group">
                        {category.subCategorias ? (
                          <div className="text-lg p-2 text-gray-800 cursor-pointer">
                            <span className="text-sm lg:text-xl text-gray-800">
                              <a
                                href={`/category/${category.id_cat}`}
                                className="flex flex-row items-center gap-1 hover:text-blue-400"
                              >
                                {category.nombre_cat.toUpperCase()}
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m9 5 7 7-7 7"
                                  />
                                </svg>
                              </a>
                            </span>
                            <div className="absolute left-full w-max top-0 mt-0 ml-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-opacity duration-300 transform scale-95">
                              {category.subCategorias
                                .split(", ")
                                .map((subCategoria, index) => {
                                  const subCategoriaId =
                                    category.subCategoriaIds.split(", ")[index];

                                  return (
                                    <div
                                      key={index}
                                      className="uppercase text-sm lg:text-xl p-2 text-gray-800 hover:text-blue-400 hover:bg-white hover:rounded-lg"
                                    >
                                      <a
                                        href={`/category/sub_${subCategoriaId}`}
                                      >
                                        {subCategoria}
                                      </a>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm lg:text-xl uppercase p-2 text-gray-800 hover:text-blue-400 hover:bg-white">
                            <a href={`/category/${category.id_cat}`}>
                              {category.nombre_cat}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
              </Dropdown>
            </li>
            <li className="hover:text-blue-400">
              <a href="/">home</a>
            </li>
            <li className="hover:text-blue-400">
              <a href="/ofertas">ofertas</a>
            </li>
            <li className="hover:text-blue-400">
              <a href="">Contacto</a>
            </li>
          </ul>

          <div className="flex justify-between items-center gap-2">
            <button
              type="button"
              className="relative inline-flex items-center p-2 lg:p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              <BsCartFill className="w-5 h-5" />
              <span className="sr-only">Carro de compras</span>
              {totalItems > 0 && (
                <div className="absolute inline-flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
                  {totalItems}
                </div>
              )}
            </button>

            <button
              type="button"
              className="relative inline-flex items-center p-2 lg:p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 rounded-lg"
              href="/login"
            >
              <FaUser className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
      <CartDrawer open={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
