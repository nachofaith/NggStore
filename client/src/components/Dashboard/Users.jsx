import { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./Users/Add";
import { Button, Modal, Select } from "flowbite-react";
import useRegister from "../../hooks/useRegister";

export default function Users() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState("center");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const { handleRegister, error } = useRegister();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users"); // Reemplaza con tu URL de API
        setData(response.data); // Asigna los datos recibidos al estado
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [trigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, email, password, role);

    setTrigger(!trigger);
    setOpenModal(false);
  };

  return (
    <div class="p-4 sm:ml-64 flex flex-col md:container md:mx-auto">
      <AddUser />
      <h2 className="text-black text-2xl text-center p-10 font-semibold">
        Usuarios
      </h2>
      <div className="py-4">
        <Button onClick={() => setOpenModal(true)}>Agregar</Button>
      </div>

      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Agregar usuario</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Error!</span> {error}
                </div>
              )}

              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="jose"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="nombre@mail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rol
                </label>
                <Select
                  id="role"
                  defaultValue="client"
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Agregar</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <div class="relative overflow-x-auto shadow-md rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nombre de Usuario
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Rol
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                class="bg-blue-500 border-b border-blue-300 hover:bg-blue-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {item.username}
                </th>
                <td class="px-6 py-4">{item.email}</td>
                <td class="px-6 py-4">{item.role}</td>

                <td class="px-6 py-4">
                  <a href="#" class="font-medium text-white hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
