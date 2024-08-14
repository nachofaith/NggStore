import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import useRegister from "../../../hooks/Marca/useRegister";

// eslint-disable-next-line react/prop-types
export default function AddMarca({ modal, trigger, setTrigger, setOpenModal }) {
  
  // const [modalPlacement, setModalPlacement] = useState("center");
  const modalPlacement = "center";
  const { handleRegister, error } = useRegister();
  const [nombreMarca, setNombreMarca] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(nombreMarca);
    setTrigger(!trigger);
    setOpenModal(false);
  };

  // useEffect(() => {
  //   setOpenModal(modal);
  // }, [modal]);

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Agregar Marca</Modal.Header>
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
                htmlFor="nombreMarca"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre Marca
              </label>
              <input
                type="text"
                value={nombreMarca}
                onChange={(e) => setNombreMarca(e.target.value)}
                id="nombreMarca"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Logitech"
                required
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Agregar</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
