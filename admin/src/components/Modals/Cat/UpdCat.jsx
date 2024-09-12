import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useUpdate from "../../../hooks/Cat/useUpdate";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import useDelete from "../../../hooks/Cat/useDelete.jsx";
import useRegister from "../../../hooks/Cat/useRegister";
import useRead from "../../../hooks/Cat/useRead.jsx";


export default function UpdCat({
  modal,
  trigger,
  setTrigger,
  setOpenModalUpd,
  id,
}) {
  // const [modalPlacement, setModalPlacement] = useState("center");
  const modalPlacement = "center";
  const [nombreCat, setNombreCat] = useState("");
  const [nombreSubCat, setNombreSubCat] = useState("");
  const [errorMostrar, setErrorMostrar] = useState(null);
  const [triggerSub, setTriggerSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { handleDeleteSub } = useDelete();
  const { handleRegisterSub } = useRegister();
  const { handleUpdate } = useUpdate();
  const [subCategoriasArray, setSubCategoriasArray] = useState([]);
  const { data, subCat, fetchData } = useRead(id);

  useEffect(() => {
    if (data) {
      setSubCategoriasArray(subCat);
      setSelectedCategory(data.id_cat);
      setNombreCat(data.nombre_cat);
    }
  }, [data, subCat, trigger, triggerSub]);

  const handleSubmitDel = async (id, e) => {
    e.preventDefault();
    await handleDeleteSub(id);
    fetchData(); // Volver a cargar los datos
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(selectedCategory, nombreCat);

    if (nombreSubCat != "" && nombreSubCat.length > 1) {
      handleRegisterSub(selectedCategory, nombreSubCat);
    }
    setNombreSubCat("")
    fetchData(); 
    setTrigger(!trigger);
    setTriggerSub(!triggerSub);
  };

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModalUpd(false)}
    >
      <Modal.Header>Editar Categoria</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            {errorMostrar && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span> {errorMostrar}
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="nombreCat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Id Categoria
              </label>
              <input
                type="text"
                value={selectedCategory}
                id="idCat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                disabled
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="nombreCat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre Categoria
              </label>
              <input
                type="text"
                value={nombreCat}
                onChange={(e) => setNombreCat(e.target.value)}
                id="nombreCat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Logitech"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="nombreCat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sub Categoria
              </label>
              <input
                type="text"
                value={nombreSubCat}
                onChange={(e) => setNombreSubCat(e.target.value)}
                id="nombreSubCat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Parlantes"
                required
              />
            </div>
            <div className="mb-5">
              <div>
                <Table>
                  <Table.Head>
                    <Table.HeadCell>SubCategorias</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y font-bold">
                    {subCategoriasArray.length > 0 ? (
                      subCat.map((sub, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell>{sub.nombre}</Table.Cell>
                          <Table.Cell className="gap-2 flex">
                            <Link
                              onClick={(e) =>
                                handleSubmitDel(sub.id, e)
                              }
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                              <span>Eliminar</span>
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell colSpan="2">
                          No hay subcategorías disponibles
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Actualizar</Button>
        <Button color="gray" onClick={() => setOpenModalUpd(false)}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
