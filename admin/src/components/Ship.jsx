import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AddShip from "./Modals/Ship/AddShip";
import UpdShip from "./Modals/Ship/UpdShip";
import useShipping from "../hooks/useShipping";

export default function Ship() {
  const [trigger, setTrigger] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpd, setOpenModalUpd] = useState(false);
  const [idShip, setIdShip] = useState("");

  const { readShip, deleteShip, shippingData, error } = useShipping();

  const fetchShippingData = async () => {
    const result = await readShip();
  };

  useEffect(() => {
    fetchShippingData(); // Llama a la función para consultar los tipos de envío al montar el componente
  }, [trigger, openModal, openModalUpd]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  const handleSubmitDel = (id, e) => {
    e.preventDefault();
    deleteShip(id);
    setTrigger(!trigger);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    setIdShip(id);
    setOpenModalUpd(true);
    
  };

  return (
    <>
      <AddShip
        modal={openModal}
        setOpenModal={setOpenModal}
        trigger={trigger}
        setTrigger={setTrigger}
      />
      <UpdShip
        modal={openModalUpd}
        setOpenModalUpd={setOpenModalUpd}
        trigger={trigger}
        setTrigger={setTrigger}
        id={idShip}
      />
      <div className="p-4 flex flex-col sm:ml-64 md:ml-64">
        <h2 className="text-black text-4xl text-center p-10 font-semibold">
          Envíos
        </h2>

        <div className="mx-auto">
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
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Descripción</Table.HeadCell>
              <Table.HeadCell>Tipo</Table.HeadCell>
              <Table.HeadCell>Precio</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y font-bold">
              {shippingData &&
                shippingData.map((item) => (
                  <Table.Row
                    key={item.idShipp}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.idShipp}
                    </Table.Cell>
                    <Table.Cell>{item.nameShipp}</Table.Cell>
                    <Table.Cell>{item.descShipp}</Table.Cell>
                    <Table.Cell>{item.typeShipp}</Table.Cell>
                    <Table.Cell>{item.priceShipp}</Table.Cell>

                    <Table.Cell className="gap-2 flex">
                      <Link
                        onClick={(e) => handleUpdate(e, item.idShipp)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        <span>Editar</span>
                      </Link>
                      |
                      <Link
                        onClick={(e) => handleSubmitDel(item.idShipp, e)}
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
    </>
  );
}
