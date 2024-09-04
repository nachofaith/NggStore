import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";

import useDelete from "../hooks/Cat/useDelete.jsx";
import AddCat from "./Modals/Cat/AddCat.jsx";
import UpdCat from "./Modals/Cat/UpdCat.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Categoria() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpd, setOpenModalUpd] = useState(false);
  const [nombreCat, setNombreCat] = useState("");
  const [idCat, setIdCat] = useState("");
  const [trigger, setTrigger] = useState(false);
  const { handleDelete, error } = useDelete();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categoria`);
        const mappedData = response.data.map((item) => ({
          id: item.id_cat,
          name: item.nombre_cat,
          count: item.subCategoriaCount
        }));
        setData(mappedData); // También puedes guardar el objeto completo si lo necesitas
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [trigger,openModal,openModalUpd]);

  const handleSubmitDel = (id, e) => {
    e.preventDefault();
    handleDelete(id);
    setTrigger(!trigger);
  };

  const handleUpdate = (e, modal, id, name) => {
    e.preventDefault();
    
    setNombreCat(name);
    setIdCat(id);
    setOpenModalUpd(modal);
  };

  return (
    <div className="p-4 flex flex-col sm:ml-64">
      <UpdCat
        modal={openModalUpd}
        trigger={trigger}
        setTrigger={setTrigger}
        setOpenModalUpd={setOpenModalUpd}
        id={idCat}
        name={nombreCat}
      />
      <AddCat
        modal={openModal}
        setOpenModal={setOpenModal}
        trigger={trigger}
        setTrigger={setTrigger}
      />
      <div className="mx-auto ">
        <h2 className="text-black text-4xl text-center p-10 font-semibold">
          Categorias
        </h2>
        <div className="py-4">
          <Button onClick={() => setOpenModal(true)}>Agregar</Button>
        </div>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Error!</span> {error}
          </div>
        )}
        <Table className="text-center">
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Categoria</Table.HeadCell>
            <Table.HeadCell>SubCategorias</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y font-bold">
            {data.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.count}</Table.Cell>

                <Table.Cell className="gap-2 flex">
                  <Link
                    onClick={(e) => handleUpdate(e, true, item.id, item.name)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <span>Editar</span>
                  </Link>
                  |
                  <Link
                    onClick={(e) => handleSubmitDel(item.id, e)}
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
