import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import { Spinner } from "flowbite-react";

export default function Header() {
  const { dataCat } = useRead();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataCat !== null) {
      // // Retrasar la desaparición del spinner por 5 segundos
      // setTimeout(() => {
      //   setLoading(false);
      // }, 4000); 
      setLoading(false)
    }
  }, [dataCat]);

  return (
    <div className="">
      <div className="container mx-auto">
        <nav className="text-gray-600 flex lg:flex-row md:flex-col md:items-center mx-auto p-4 justify-between">
          <div id="logo" className="flex flex-row items-end gap-2 md:pb-4">
            <img className="h-20" src="/src/assets/logo.webp" alt="NGG Store Logo" />
            <h1 className="text-6xl text-gray-400">
              <span className="text-gray-800">NGG</span>STORE
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
                          <a
                            href={`/category/${category.id_cat}`}
                            target="_blank"
                          >
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

          <div className="flex justify-between align-middle items-center">
            <a href="/login">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
