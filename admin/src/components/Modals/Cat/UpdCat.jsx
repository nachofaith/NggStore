import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useUpdate from "../../../hooks/Cat/useUpdate";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import useDelete from "../../../hooks/Cat/useDelete.jsx";
import useRegister from "../../../hooks/Cat/useRegister";

// eslint-disable-next-line react/prop-types
export default function UpdCat({
  modal,
  trigger,
  setTrigger,
  setOpenModalUpd,
  id,
  name,
}) {
  // const [modalPlacement, setModalPlacement] = useState("center");
  const modalPlacement = "center";
  const [data, setData] = useState([]);
  const [nombreCat, setnombreCat] = useState("");
  const [nombreSubCat, setnombreSubCat] = useState("");
  const [idCat, setidCat] = useState("");
  const [errorMostrar, setErrorMostrar] = useState(null);
  const [triggerSub, setTriggerSub] = useState(false)
  
  const { handleDeleteSub } = useDelete();
  const { handleRegisterSub } = useRegister();
  const { handleUpdate } = useUpdate();

  useEffect(() => {
    setidCat(id);
    setnombreCat(name);
  }, [id, name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/subCategoria",
          {
            idCat,
          }
        );
        const mappedData = response.data.map((item) => ({
          id: item.id_subCat,
          name: item.nombre_subCat,
        }));
        setData(mappedData); // También puedes guardar el objeto completo si lo necesitas
      } catch (error) {
        setErrorMostrar("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [triggerSub, idCat, trigger]);

  const handleSubmitDel = (id, e) => {
    e.preventDefault();
    handleDeleteSub(id);
    setTriggerSub(!triggerSub);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(idCat, nombreCat);

    if (nombreSubCat != "" && nombreSubCat.length > 2){
      handleRegisterSub(idCat, nombreSubCat)
    }

    setTrigger(!trigger);
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
                value={idCat}
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
                onChange={(e) => setnombreCat(e.target.value)}
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
                onChange={(e) => setnombreSubCat(e.target.value)}
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
                    {data.map((item) => (
                      <Table.Row
                        key={item.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>{item.name}</Table.Cell>

                        <Table.Cell className="gap-2 flex">
                          {/* <Link
                            onClick={(e) =>
                              handleUpdate(e, true, item.id, item.name)
                            }
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            <span>Editar</span>
                          </Link>
                          | */}
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
