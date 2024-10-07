
import { useAuth } from "../context/AuthContext.jsx";
import { Sidebar } from "flowbite-react";

import {
  HiHome,
  HiShoppingBag,
  HiUser,
  HiLogout,
  HiFolder,
  HiBriefcase,
} from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";


export default function Aside() {
  const { logout } = useAuth();

  return (
    <Sidebar
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Dashboard"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiHome}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/marcas" icon={HiBriefcase}>
            Marcas
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/categorias" icon={HiFolder}>
            Categorías
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/users" icon={HiUser}>
            Users
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/ship" icon={MdLocalShipping}>
            Envíos
          </Sidebar.Item>



        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={logout} href="#" icon={HiLogout}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
