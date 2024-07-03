import { Dropdown } from "flowbite-react";

export function Header() {
  return (
    <div className="shadow-lg bg-gradient-to-r from-gray-700 to-black">
   <div className="container mx-auto">
      <nav className="text-white flex flex-row mx-auto p-4 justify-between">
        <img src="/src/assets/logonew.png" />
        <ul className="gap-8 uppercase text-2xl justify-center mx-auto flex flex-wrap items-center">
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
            <a href="">home</a>
          </li>

          <li className="hover:text-sky-400">
            <a href="">ofertas</a>
          </li>
          <li className="hover:text-sky-400">
            <a href="">Contacto</a>
          </li>
        </ul>
      </nav>
    </div>

    </div>
 
  );
}
