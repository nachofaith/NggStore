import { Dropdown } from "flowbite-react";

export function Header() {
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
