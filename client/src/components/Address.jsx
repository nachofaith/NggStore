import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { Spinner } from "flowbite-react";
import SelectAnidado from "./Select";
import Title from "./Title";
import useAddress from "../hooks/useAddress";
import useUser from "../hooks/useUser";

export default function Address() {
  const { user, loading: userLoading } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true); // Nuevo estado para controlar la visualización del spinner
  const formRef = useRef(null);
  const {
    formData,
    setFormData,
    resetFormData,
    handleInputChange,
    handleSelectChange,
    addAddress,
    addresses,
    loading,
    error,
    fetchAddresses,
  } = useAddress();

  const onCloseModal = () => {
    setOpenModal(false);
    resetFormData(); // Reiniciamos el formulario al cerrar el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRef.current && formRef.current.reportValidity()) {
      try {
        const response = await addAddress(formData, user.id);
        if (response) {
          console.log("Dirección agregada correctamente:", response);
          setOpenModal(false); // Cerrar el modal
          resetFormData(); // Restablecer el formulario
          fetchAddresses(); // Recargar direcciones después de agregar
        } else {
          console.log("Error al agregar la dirección:", response);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("El formulario contiene errores.");
    }
  };

  useEffect(() => {
    if (!userLoading && user && user.id) {
      const timer = setTimeout(() => {
        fetchAddresses(user.id);
        setShowSpinner(false); // Ocultar el spinner después de los 2 segundos
      }, 1000);

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [user, userLoading]);

  return (
    <>
      <Title text="Direcciones" align="center" />
      <Button onClick={() => setOpenModal(true)}>+ Agregar</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Agrega dirección
            </h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <SelectAnidado
                handleSelectChange={handleSelectChange}
                formData={formData}
                setFormData={setFormData}
              />
              <div className="mb-6 block">
                <Label htmlFor="street" value="Dirección" />
                <TextInput
                  id="street"
                  placeholder="Los Olivos #255"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6 block">
                <Label htmlFor="opcional" value="Información Complementaria" />
                <TextInput
                  id="opcional"
                  placeholder="Cualquier información adicional que ayude"
                  value={formData.opcional}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <ul>
        {showSpinner ? (
          <div className="mt-4">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        ) : (
          addresses.map((address) => (
            <li className=" bg-gray-100 rounded-md my-2 p-4" key={address.id}>
              <p> {address.street}</p>

              <span className=" text-red-600">Eliminar</span>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
