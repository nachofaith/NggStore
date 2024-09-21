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
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (dataCat !== null) {
      // Retrasar la desaparición del spinner por 5 segundos
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setLoading(false);
    }
  }, [dataCat]);

  return (
    <div className="">
      <div className="container mx-auto px-10">
        <nav className="text-gray-600 flex lg:flex-row md:flex-col md:items-center mx-auto p-4 justify-between pb-20">
          <div id="logo" className="flex flex-row items-end gap-2 md:pb-4">
            <img
              className="h-20"
              src="/src/assets/logo.webp"
              alt="NGG Store Logo"
            />
            <h1 className="text-6xl">
              <span className="text-gray-800 font-anton">NGG</span>
              <span className="font-anton text-gray-400">STORE</span>
            </h1>
          </div>

          <ul className="text-gray-800 tracking-tighter gap-8 uppercase text-xl justify-center mx-auto flex flex-wrap items-center md:pb-4">
            <li className="hover:text-sky-400 bg-white hover:bg-white">
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
                  dataCat.map((category) => (
                    <div key={category.id_cat} className="relative group">
                      {category.subCategorias ? (
                        <div className="text-lg p-2 text-gray-800 cursor-pointer">
                          <span className="text-xl text-gray-800">
                            <a
                              href={`/category/${category.id_cat}`}
                              className="flex flex-row items-center gap-1 hover:text-sky-400"
                            >
                              {category.nombre_cat.toUpperCase()}
                              <svg
                                className="w-4 h-4 text-gray-800 dark:text-white"
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
                              .map((subCategoria, index) => (
                                <div
                                  key={index}
                                  className="uppercase text-xl p-2 text-gray-800 hover:text-sky-400 hover:bg-white hover:rounded-lg"
                                >
                                  <a
                                    href={`/subcategoria/${subCategoria
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {subCategoria}
                                  </a>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xl uppercase p-2 text-gray-800 hover:text-sky-400 hover:bg-white">
                          <a href={`/category/${category.id_cat}`}>
                            {category.nombre_cat}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
              </Dropdown>
            </li>
            <li className="hover:text-sky-400">
              <a href="/">home</a>
            </li>

            <li className="hover:text-sky-400">
              <a href="/ofertas">ofertas</a>
            </li>
            <li className="hover:text-sky-400">
              <a href="">Contacto</a>
            </li>
          </ul>

          <div className="flex justify-between align-middle items-center gap-2">
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg px-5 py-2.5 me-2 mb-2"
              onClick={() => setIsOpen(true)}
            >
              {<BsCartFill className="w-5 h-5" />}
              <span className="sr-only">Carro de compras</span>
              {totalItems > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                  {totalItems}
                </div>
              )}
            </button>

            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg px-5 py-2.5 me-2 mb-2"
              href="/login"
            >
                <FaUser className="h-5 w-5" />
            </button>

           
          </div>
        </nav>
      </div>
      <CartDrawer open={isOpen} setIsOpen={setIsOpen}  />
    </div>
  );
}
