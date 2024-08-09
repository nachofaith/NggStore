import { Button, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddMarca (modal) {
   
    // console.log(modal)
    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState("center");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // handleRegister(username, email, password, role);
        // setTrigger(!trigger);
        // setOpenModal(false);
      };
    
      useEffect(() => {
        setOpenModal(modal);
      }, [modal]);

    return (
        
        <Modal
          show={openModal}
          position={modalPlacement}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Agregar usuario</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 p-6">
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                {/* {error && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                    role="alert"
                  >
                    <span className="font-medium">Error!</span> {error}
                  </div>
                )} */}

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
    )
}