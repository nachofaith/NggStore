import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import useRegister from "../../../hooks/Cat/useRegister";
import { Label, Select } from "flowbite-react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function AddCat({ modal, trigger, setTrigger, setOpenModal }) {
  // const [modalPlacement, setModalPlacement] = useState("center");
  const modalPlacement = "center";
  const { handleRegister, handleRegisterSub, error } = useRegister();
  const [nombreCat, setNombreCat] = useState("");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("---");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // Actualiza el estado con el valor seleccionado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedValue == "---") {
      handleRegister(nombreCat);
      setTrigger(!trigger);
      setOpenModal(false);
    } else {
      handleRegisterSub(selectedValue, nombreCat);
      setTrigger(!trigger);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categoria");
        const mappedData = response.data.map((item) => ({
          id: item.id_cat,
          name: item.nombre_cat,
        }));
        setData(mappedData); // También puedes guardar el objeto completo si lo necesitas
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Agregar Categoria</Modal.Header>
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
              <div className="mb-2 block">
                <Label
                  htmlFor="cat"
                  value="Categoria Padre (Selecciona categoria padre para crear una sub-categoria)"
                />
              </div>
              <Select
                id="cat"
                required
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option>---</option>
                {data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {/* <p>Valor seleccionado: {selectedValue}</p>  */}
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
                placeholder="Teclados"
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
