import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, Select } from "flowbite-react";

import useShipping from "../../../hooks/useShipping";

export default function UpdShip({
  modal,
  trigger,
  setTrigger,
  setOpenModalUpd,
  id,
}) {
  const [modalPlacement, setModalPlacement] = useState("center");
  const { readShipById, updateShip, shippingDetails, error } = useShipping();
  const [nameShip, setNameShip] = useState("");
  const [descShip, setDescShip] = useState("");
  const [priceShip, setPriceShip] = useState("0");
  const [typeShip, setTypeShip] = useState("");

  useEffect(() => {
    if (id) {
      readShipById(id); // Cargar los detalles del envío al montar el componente
    }
  }, [id, readShipById]);

  useEffect(() => {
    if (shippingDetails) {
      setNameShip(shippingDetails.nameShipp); // Asegúrate de usar el nombre correcto según los datos
      setDescShip(shippingDetails.descShipp);
      setPriceShip(String(shippingDetails.priceShipp));
      setTypeShip(shippingDetails.typeShipp);
    }
  }, [shippingDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, nameShip, descShip, priceShip, typeShip);
    updateShip(id, nameShip, descShip, priceShip, typeShip);
    setTrigger(!trigger);
    setOpenModalUpd(false);
  };

  const handleTypeShipChange = (e) => {
    const selectedType = e.target.value;
    setTypeShip(selectedType);

    // Si el tipo de envío no es "normal", se establece el precio en "0"
    if (selectedType !== "normal") {
      setPriceShip("0");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shippingDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModalUpd(false)}
    >
      <Modal.Header>Editar Marca</Modal.Header>
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
                Id
              </label>
              <input
                type="text"
                value={id}
                id="idMarca"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                disabled
              />
            </div>

            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="desc" value="Nombre Envío" />
              </div>

              <input
                type="text"
                value={nameShip}
                onChange={(e) => setNameShip(e.target.value)}
                id="nombreMarca"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="NGG Envios"
                required
              />
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="desc" value="Desc Envío" />
              </div>

              <input
                type="text"
                value={descShip}
                onChange={(e) => setDescShip(e.target.value)}
                id="desc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="de 2 a 3 dias habiles"
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
                value={typeShip}
                onChange={handleTypeShipChange}
                // onChange={(e) => setTypeShip(e.target.value)} // Maneja el cambio en el select
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
        <Button onClick={handleSubmit}>Actualizar</Button>
        <Button color="gray" onClick={() => setOpenModalUpd(false)}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
