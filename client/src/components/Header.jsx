import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import useRead from "../hooks/useRead";
import { Spinner } from "flowbite-react";
import { BsCartFill } from "react-icons/bs";
import { useCart } from "../hooks/useCart";
import { FaUser } from "react-icons/fa";
import CartDrawer from "./Drawer";
import useUser from "../hooks/useUser";
import useCat from "../hooks/useCat";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { fetchCat, cat, setLoading, loading, error } = useCat();

  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); // cart ahora tiene la estructura { items: [], ship: {} }

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    fetchCat();
  }, []);

  useEffect(() => {
    if (cat !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [cat]);

  const handleLoginClick = () => {
    navigate("/login");
  };

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
                  cat
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
                      <div key={category.id} className="relative group">
                        {cat && (
                          <div className="text-sm lg:text-xl uppercase p-2 text-gray-800 hover:text-blue-400 hover:bg-white">
                            <a href={`/category/${category.id}`}>
                              {category.name}
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
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 rounded-lg"
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

            {!user && (
              <button
                type="button"
                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 rounded-lg"
                onClick={handleLoginClick}
              >
                <FaUser className="w-5 h-5" />
                <span className="sr-only">Login</span>
              </button>
            )}

            {user && (
              <div className="flex md:order-2">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    // Usamos un div en lugar de button para evitar el error
                    <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 rounded-lg cursor-pointer">
                      <FaUser className="w-5 h-5" />
                      <span className="sr-only">Profile</span>
                    </div>
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">Bienvenid@</span>
                    <span className="block truncate text-sm font-medium">
                      {user.first_name}
                    </span>
                  </Dropdown.Header>

                  <Dropdown.Item href="/profile">Cuenta</Dropdown.Item>
                  <Dropdown.Item href="/profile">Pedidos</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </div>
        </nav>
      </div>
      <CartDrawer open={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
