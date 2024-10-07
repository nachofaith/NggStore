import SelectAnidado from "../components/Select";
import Resumen from "../components/Resumen";
import { useEffect, useState, useRef } from "react";

export default function Step1({ setCurrentStep }) {
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    phone: "",
    email1: "",
    email2: "",
    region: "",
    ciudad: "",
    comuna: "",
    direc: "",
    numDirec: "",
    rut: "",
    opcional: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (formRef.current && formRef.current.reportValidity() && !error) {
      formRef.current.requestSubmit();
      setCurrentStep(2);
    } else {
      console.log("El formulario contiene errores.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formatRUT = (value) => {
    const cleaned = value.replace(/[^0-9kK]/g, "");

    if (cleaned.length === 0) return "";

    const length = cleaned.length;
    const rutBody = cleaned.slice(0, length - 1);
    const rutDV = cleaned[length - 1];

    const formattedBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedBody}-${rutDV}`;
  };

  const handleRUT = (e) => {
    const { value } = e.target;
    const formattedRUT = formatRUT(value);

    // Actualizar el formData con el RUT formateado
    setFormData((prevData) => ({
      ...prevData,
      rut: formattedRUT,
    }));

    // Opcional: Validación del RUT (si es necesario)
    if (formattedRUT.replace(/[^0-9kK.-]/g, "").length < 12) {
      setError("El RUT debe tener al menos 9 caracteres");
    } else {
      setError(""); // Resetea el error si la longitud es válida
    }
  };

  return (
    <>
      <div
        id="stepper"
        className="flex justify-center items-center border rounded-md py-4"
      >
        <ol className="items-center space-y-4 md:space-x-52 sm:flex sm:space-x-30 sm:space-y-0 rtl:space-x-reverse">
          <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">
                Información del Cliente
              </h3>
              <p className="text-sm">Dirección y datos</p>
            </span>
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
            </span>
            <span>
              <h3 className="font-medium leading-tight">Opciones de entrega</h3>
              <p className="text-sm">Envío o Retiro</p>
            </span>
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            <span>
              <h3 className="font-medium leading-tight">Pagar</h3>
              <p className="text-sm">Opciones de</p>
            </span>
          </li>
        </ol>
      </div>
      <div className="flex flex-row pt-10 gap-4 ">
        <div
          id="datos"
          className="md:basis-2/3 sm:flex-col sm:flex p-10 border rounded-md "
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Juan"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Perez"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Numero Telefónico
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+56911112222"
                  pattern="^\+56[9][0-9]{8}$"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="rut"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  RUT
                </label>
                <input
                  type="text"
                  id="rut"
                  className={
                    error
                      ? `bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500`
                      : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
                  }
                  placeholder="11.222.333-5"
                  value={formData.rut}
                  onChange={handleRUT}
                  maxLength={12}
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Error!</span> {error}
                  </p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="email1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email1"
                    value={formData.email1}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="email2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmar Email
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email2"
                    value={formData.email2}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-gray-500 text-center py-4">
                Datos de dirección
              </h1>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <SelectAnidado
                  handleSelectChange={handleSelectChange}
                  formData={formData}
                  setFormData={setFormData}
                />
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="direc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calle | Avenida | Pasaje
                    </label>
                    <input
                      type="text"
                      id="direc"
                      value={formData.direc}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="numDirec"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Numero
                    </label>
                    <input
                      type="text"
                      id="numDirec"
                      value={formData.numDirec}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="opcional"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      N° depto | oficina | Datos adicionales
                    </label>
                    <input
                      type="text"
                      id="opcional"
                      value={formData.opcional}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Resumen onClick={handleClick} />
      </div>
    </>
  );
}
