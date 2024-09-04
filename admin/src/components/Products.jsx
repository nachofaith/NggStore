import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useDelete from "../hooks/Products/useDelete.jsx";
import FormatCLP from "./FormateadorCLP.jsx";
import { Table } from "flowbite-react";
import AddProd from "./Modals/Products/AddProd.jsx";
import UpdProd from "./Modals/Products/UpdProd.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Products() {
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
        const response = await axios.get(`${apiUrl}/products`); // Reemplaza con tu URL de API
        const mappedData = response.data.map((item) => ({
          id: item.id_prod,
          name: item.nombre_prod,
          marca: item.nombre_marca,
          cat: item.nombre_cat,
          stock: item.stock_prod,
          precio: item.precio_prod,
          precio_off: item.precio_off_prod,
        }));
        setData(mappedData); // Asigna los datos recibidos al estado
        console.log("consulta correcta")
      } catch (error) {

        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [trigger]);

  const handleSubmitDel = (id, e) => {
    e.preventDefault();
    handleDelete(id);
    setTrigger(!trigger);
  };

  const handleUpdate = (e, modal, id, nombre) => {
    e.preventDefault();
    setOpenModalUpd(modal);
    setNombreMarca(nombre);
    setIdMarca(id);
  };

  return (
    <div className="p-4 flex flex-col sm:ml-64">
      <UpdProd
        modal={openModalUpd}
        trigger={trigger}
        setTrigger={setTrigger}
        setOpenModalUpd={setOpenModalUpd}
        id={idMarca}
        nombre={nombreMarca}
      />
      <AddProd
        modal={openModal}
        setOpenModal={setOpenModal}
        trigger={trigger}
        setTrigger={setTrigger}
      />
      <div className="mx-auto ">
        <h2 className="text-black text-4xl text-center p-10 font-semibold">
          Productos
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
          <Table.Head className="text-center">
            <Table.HeadCell>Producto</Table.HeadCell>
            <Table.HeadCell>Marca</Table.HeadCell>
            <Table.HeadCell>Categoría</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Precio Normal</Table.HeadCell>
            <Table.HeadCell>Precio Oferta</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y font-bold">
            {data.map((item) => (
              <Table.Row key={item.id} className="bg-white">
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.marca}</Table.Cell>
                <Table.Cell>{item.cat}</Table.Cell>
                <Table.Cell>{item.stock}</Table.Cell>
                <Table.Cell>
                  <FormatCLP precio={item.precio} />
                </Table.Cell>
                <Table.Cell>
                  <FormatCLP precio={item.precio_off} />
                </Table.Cell>
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
