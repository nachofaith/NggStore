import { useState, useEffect, useRef } from "react";
import useShipping from "../hooks/useShipping";
import { useCart } from "../hooks/useCart";
import FormatCLP from "./FormateadorCLP";
import Resumen from "../components/Resumen";
import Stepper from "./Stepper";

export default function Step2({ setCurrentStep }) {
  const formRef = useRef(null);
  const { readShip, shippingData, error } = useShipping();
  const { cart, setShip } = useCart(); // Obtener el método de envío y la función para actualizarlo
  const [errorRadio, setErrorRadio] = useState(null);

  const fetchShippingData = async () => {
    await readShip();
  };

  useEffect(() => {
    fetchShippingData(); // Llama a la función para consultar los tipos de envío al montar el componente
  }, []);

  const handleStepClick = (step) => {
    setCurrentStep(step); // Cambia el estado al paso correspondiente
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (
      formRef.current &&
      formRef.current.reportValidity() &&
      !error &&
      !errorRadio
    ) {
      formRef.current.requestSubmit();
      setCurrentStep(3); // Cambia al siguiente paso
    } else {
      setErrorRadio(true);
      console.log("El formulario contiene errores.");
    }
  };

  const handleShippingChange = (selectedShip) => {
    
    setErrorRadio(null);
    setShip(selectedShip); // Actualiza el estado con el objeto del envío seleccionado
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const shippingInfo = cart.ship; 

  return (
    <>
      <Stepper step={2} handleStepClick={handleStepClick} />

      <div className="pt-10 gap-4 grid md:grid-cols-4 sm:grid-cols-1 mx-2">
        <div
          id="datos"
          className="lg:col-span-3 md:col-span-3 p-10 border rounded-md"
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <h1 className="text-xl pb-4 text-center">Opciones de Entrega</h1>
            {errorRadio && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span> Debe elegir un
                método de envío.
              </div>
            )}

            <ul className="grid w-full gap-6 md:grid-cols-1">
              {shippingData &&
                shippingData.map((item) => (
                  <li key={item.idShipp}>
                    <input
                      type="radio"
                      id={`check${item.idShipp}`}
                      name="shipping"
                      value={item.idShipp}
                      className="hidden peer"
                      required
                      onChange={() => handleShippingChange(item)} // Enviar el objeto `item` completo
                      checked={shippingInfo?.idShipp === item.idShipp} // Verifica si esta opción es la seleccionada
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
                        {item.typeShipp === "porpagar" && `Por Pagar`}
                        {item.typeShipp === "normal" && (
                          <FormatCLP precio={item.priceShipp} />
                        )}
                        {item.typeShipp === "tienda" && `Gratis`}
                      </span>
                    </label>
                  </li>
                ))}
            </ul>
          </form>
        </div>
        <div className="">
          <Resumen onClick={handleClick} />
        </div>
      </div>
    </>
  );
}
