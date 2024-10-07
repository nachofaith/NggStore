import { Button, Modal } from "flowbite-react";
import { Label, Select } from "flowbite-react";
import { useState } from "react";
import useShipping from "../../../hooks/useShipping";

export default function AddShip({ modal, trigger, setTrigger, setOpenModal }) {
  const [modalPlacement, setModalPlacement] = useState("center");
  const [nameShip, setNameShip] = useState("");
  const [descShip, setDescShip] = useState("");
  const [priceShip, setPriceShip] = useState("0");
  const [typeShip, setTypeShip] = useState(""); // Estado para el tipo de envío

  const { createShip, error } = useShipping();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameShip, descShip, priceShip, typeShip)
    createShip(nameShip, descShip, priceShip, typeShip);
    setTrigger(!trigger);
    setOpenModal(false);
  };

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Agregar Envío</Modal.Header>
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
                Nombre Envío
              </label>
              <input
                type="text"
                value={nameShip}
                onChange={(e) => setNameShip(e.target.value)}
                id="nombreMarca"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Retiro en local"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="descShip"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción
              </label>
              <input
                type="text"
                value={descShip}
                onChange={(e) => setDescShip(e.target.value)}
                id="descShip"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="de 2 a 3 días hábiles"
                required
              />
            </div>
            <div className="max-w-md mb-5">
              <div className="mb-2 block">
                <Label htmlFor="tipo" value="Tipo de Envío" />
              </div>
              <Select
                id="tipo"
                required
                onChange={(e) => setTypeShip(e.target.value)} // Maneja el cambio en el select
              >
                <option value="">Selecciona un tipo de envío</option>
                <option value="tienda">Retiro en tienda</option>
                <option value="porpagar">Envío Por Pagar</option>
                <option value="normal">Envío normal</option>
              </Select>
            </div>

            {typeShip == "normal" && (
              <div className="mb-5">
                <label
                  htmlFor="priceShip"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Precio Envío
                </label>

                <input
                  type="text"
                  value={priceShip}
                  onChange={(e) => setPriceShip(e.target.value)}
                  id="priceShip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="3.990"
                  required
                />
              </div>
            )}
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
