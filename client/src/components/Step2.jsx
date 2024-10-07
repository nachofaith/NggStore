import { useState, useEffect } from "react";
import useShipping from "../hooks/useShipping";
import FormatCLP from "./FormateadorCLP";
import { Label } from "flowbite-react";

import Resumen from "../components/Resumen";

export default function Step2({ setCurrentStep }) {
  const [ship, setShip] = useState(null);
  const { readShip, shippingData, error } = useShipping();

  const fetchShippingData = async () => {
    const result = await readShip();
  };

  useEffect(() => {
    fetchShippingData(); // Llama a la función para consultar los tipos de envío al montar el componente
  }, []);

  const handleStep1Click = () => {
    setCurrentStep(1); // Cambia el estado a 1
  };

  const handleClick = () => {
    if (formRef.current && formRef.current.reportValidity() && !error) {
      formRef.current.requestSubmit();
      setCurrentStep(2);
    } else {
      console.log("El formulario contiene errores.");
    }
  };

  const handleShippingChange = (selectedShip) => {
    setShip(selectedShip); // Actualiza el estado con el objeto del envío seleccionado
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        id="stepper"
        className="flex justify-center items-center border rounded-md py-4"
      >
        <ol className="items-center space-y-4 md:space-x-52 sm:flex sm:space-x-30 sm:space-y-0 rtl:space-x-reverse">
          <li
            className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse cursor-pointer"
            onClick={handleStep1Click} // Maneja el clic para regresar al Step 1
          >
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">
                Información del Cliente
              </h3>
              <p className="text-sm">Dirección y datos</p>
            </span>
          </li>

          <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
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
          className="md:basis-2/3 sm:flex-col sm:flex p-10 border rounded-md"
        >
          <h1 className="text-xl pb-4 text-center">Opciones de Entrega</h1>
          <ul className="grid w-full gap-6 md:grid-cols-1">
            {shippingData.map((item) => (
              <li key={item.idShipp}>
                <input
                  type="radio"
                  id={`check${item.idShipp}`}
                  name="shipping"
                  value={item.idShipp}
                  className="hidden peer"
                  required
                  onChange={() => handleShippingChange(item)} // Enviar el objeto `item` completo
                />
                <label
                  htmlFor={`check${item.idShipp}`}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      {item.nameShipp}
                    </div>
                    <div className="w-full">{item.descShipp}</div>
                  </div>
                  <span className="uppercase">
                    {item.typeShipp == "porpagar" && `Por Pagar`}
                    {item.typeShipp == "normal" && (
                      <FormatCLP precio={item.priceShipp} />
                    )}
                    {item.typeShipp == "tienda" && `Gratis`}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <Resumen onClick={handleClick} ship={ship} />
      </div>
    </>
  );
}
