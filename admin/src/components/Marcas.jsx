import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useDelete from "../hooks/Marca/useDelete.jsx";

import { Table } from "flowbite-react";
import AddMarca from "./Modals/Marca/AddMarca.jsx";
import UpdMarca from "./Modals/Marca/UpdMarca.jsx";

export default function Marcas() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpd, setOpenModalUpd] = useState(false);
  const [nombreMarca, setNombreMarca] = useState("");
  const [idMarca, setIdMarca] = useState("");
  const [trigger, setTrigger] = useState(false);
  const { handleDelete, errorDel } = useDelete();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/marcas"); // Reemplaza con tu URL de API
        setData(response.data); // Asigna los datos recibidos al estado
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [trigger]);

  const handleSubmitDel = (id_marca, e) => {
    e.preventDefault();
    handleDelete(id_marca);
    setTrigger(!trigger);
  };

  const handleUpdate = (e, modal, id, nombre) => {
    e.preventDefault();
    setOpenModalUpd(modal);
    setNombreMarca(nombre);
    setIdMarca(id);

    console.log(modal, id, nombre);
  };

  return (
    <div className="p-4 flex flex-col sm:ml-64">
      <UpdMarca
        modal={openModalUpd}
        trigger={trigger}
        setTrigger={setTrigger}
        setOpenModalUpd={setOpenModalUpd}
        id={idMarca}
        nombre={nombreMarca}
      />
      <AddMarca
        modal={openModal}
        setOpenModal={setOpenModal}
        trigger={trigger}
        setTrigger={setTrigger}
      />
      <div className="mx-auto ">
        <h2 className="text-black text-4xl text-center p-10 font-semibold">
          Marcas
        </h2>
        <div className="py-4">
          <Button onClick={() => setOpenModal(true)}>Agregar</Button>
        </div>

        <Table>
          {errorDel && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Error!</span> {errorDel}
            </div>
          )}
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Marca</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y font-bold">
            {data.map((item) => (
              <Table.Row
                key={item.id_marca}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id_marca}
                </Table.Cell>
                <Table.Cell>{item.nombre_marca}</Table.Cell>

                <Table.Cell className="gap-2 flex">
                  <Link
                    onClick={(e) =>
                      handleUpdate(e, true, item.id_marca, item.nombre_marca)
                    }
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <span>Editar</span>
                  </Link>
                  |
                  <Link
                    onClick={(e) => handleSubmitDel(item.id_marca, e)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <span>Eliminar</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
