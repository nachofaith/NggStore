import { Sidebar } from "flowbite-react";
import { HiUser, HiViewBoards } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineRequestPage } from "react-icons/md";



export default function MenuProfile({ onMenuSelect }) {
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiUser} onClick={() => onMenuSelect("info")}>
            Información
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={MdOutlineLocalShipping} onClick={() => onMenuSelect("address")}>
            Direcciones
          </Sidebar.Item> */}
          <Sidebar.Item href="#" icon={MdOutlineRequestPage} onClick={() => onMenuSelect("pedidos")}>
            Pedidos
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={IoCloseCircle} onClick={() => onMenuSelect("logout")}>
            Cerrar sesión
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
