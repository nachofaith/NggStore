import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Sidebar } from "flowbite-react";

import {
  HiHome,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
  HiLogout,
  HiFolder,
  HiBriefcase,
} from "react-icons/hi";

export default function Aside() {
  const { logout } = useAuth();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard">
              <Sidebar.Item icon={HiHome}>Dashboard</Sidebar.Item>
            </Link>

            <Link to="/dashboard/marcas">
              <Sidebar.Item icon={HiBriefcase}>Marcas</Sidebar.Item>
            </Link>

            <Link to="/dashboard/categorias">
              <Sidebar.Item icon={HiFolder}>Categorías</Sidebar.Item>
            </Link>
            <Link to="/dashboard/users">
              <Sidebar.Item icon={HiUser}>Users</Sidebar.Item>
            </Link>

            <Link to="/dashboard/products">
              <Sidebar.Item icon={HiShoppingBag}>Products</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Documentation
            </Sidebar.Item>

            <Link onClick={logout}>
              <Sidebar.Item icon={HiLogout}>Logout</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  );
}
