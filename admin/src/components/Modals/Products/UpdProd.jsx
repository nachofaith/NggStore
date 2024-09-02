import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useUpdate from "../../../hooks/Marca/useUpdate";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UpdProd({
  modal,
  trigger,
  setTrigger,
  setOpenModalUpd,
  id,
  nombre,
}) {
  const { handleUpdate, error } = useUpdate();
  const modalPlacement = "center";
  const [idProd, setIdProd] = useState("");
  const [data, setData] = useState(null); // Inicializar como null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/producto/${id}`);
        console.log(`${apiUrl}/producto/${id}`)
        const product = response.data;
        setData(product); // Guardar el producto directamente
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(idProd);
    setTrigger(!trigger);
    setOpenModalUpd(false);
  };

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModalUpd(false)}
    >
      <Modal.Header>Editar Producto</Modal.Header>
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
                Id Producto
              </label>
              <input
                type="text"
                value={data?.id_prod || ""} // Acceder a la propiedad del producto
                id="idProd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                disabled
              />
            </div>

            {data && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="nombreProd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre Producto
                  </label>
                  <input
                    type="text"
                    value={data.nombre_prod} // Acceder al nombre del producto
                    onChange={(e) => setNombreProd(e.target.value)}
                    id="nombreProd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Logitech"
                    required
                  />
                </div>
                {/* Puedes seguir agregando más campos aquí según los datos que tienes */}
              </>
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
