import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Select } from "flowbite-react";
import { Link } from "react-router-dom";
// import useRegister from "../../hooks/useRegister";
// import useDelete from "../../hooks/useDelete";
import { Table } from "flowbite-react";
import AddMarca from "./AddMarca";

export default function Marcas() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const [modalPlacement, setModalPlacement] = useState("center");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  // const { handleRegister, error } = useRegister();
  // const { handleDelete, errorDel } = useDelete();

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

  <AddMarca modal={openModal} />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleRegister(username, email, password, role);
  //   setTrigger(!trigger);
  //   setOpenModal(false);
  // };

  const handleSubmitDel = (email, e) => {
    e.preventDefault();
    // handleDelete(email);
    // setTrigger(!trigger);
  };

  return (
    <div className="p-4 flex flex-col sm:ml-64">
      <div className="mx-auto ">
        <h2 className="text-black text-4xl text-center p-10 font-semibold">
          Marcas
        </h2>
        <div className="py-4">
          <Button onClick={() => setOpenModal(true)}>Agregar</Button>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Marca</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => (
              <Table.Row
                key={item.id_marca}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id_marca}
                </Table.Cell>
                <Table.Cell>{item.nombre_marca}</Table.Cell>

                <Table.Cell>
                  <Link
                    onClick={(e) => handleSubmitDel(item.email, e)}
                    to="/"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Eliminar
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
