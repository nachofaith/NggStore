import { Dropdown } from "flowbite-react";
import { useEffect, useState, React, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Perfil from "./Perfil.jsx";
import { useAuth } from "../context/login.jsx";

export default function Header() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { isAuth } = useAuth();

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const tokenJwt = localStorage.getItem("token");

    if (tokenJwt) {
      try {
        // Decodificar el token
        const decoded = jwtDecode(tokenJwt);
        setUser(decoded.username);
        setEmail(decoded.email);
        setRole(decoded.role);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [isAuth]);

  return (
    <div className="">
      <div className="container mx-auto">
        <nav className="text-gray-600 flex flex-row mx-auto p-4 justify-between">
          <div id="logo" className="flex flex-row items-end gap-2">
            <img className="h-20" src="/src/assets/logo.webp" />
            <h1 className="text-6xl text-gray-400">
              <span className=" text-gray-800">NGG</span>STORE
            </h1>
          </div>

          <ul className=" tracking-tighter gap-8 uppercase text-xl justify-center mx-auto flex flex-wrap items-center">
            <li className="">
              <Dropdown
                className=""
                label="CATEGORÍAS"
                dismissOnClick={false}
                inline
              >
                <Dropdown.Item className="text-xl">Audífonos</Dropdown.Item>
                <Dropdown.Item className="text-xl">Mouse</Dropdown.Item>
                <Dropdown.Item className="text-xl">Teclados</Dropdown.Item>
                <Dropdown.Item className="text-xl">Monitores</Dropdown.Item>
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
            {isAuth ? (
              <Perfil user={user} email={email} role={role} />
            ) : (
              // <div>

              //   <p>Bienvenido {user}</p>
              //   <a onClick={handleClick} href="">
              //     <span>Cerrar sesión</span>
              //   </a>
              // </div>
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
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
