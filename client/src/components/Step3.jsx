import { useEffect, useRef } from "react";
import Stepper from "./Stepper";
import usePayment from "../hooks/usePayment";
import Resumen from "./Resumen";
import { useCart } from "../hooks/useCart";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API

export default function Step3({ setCurrentStep }) {
  const formRef = useRef(null);

  // Obtener la función y el valor de payment desde el contexto del carrito
  const { setPayment, paymentMethod } = useCart();
  const { readPayment, paymentData } = usePayment();

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    readPayment();
  }, [readPayment]);

  const handleClick = () => {
    // Aquí iría la lógica de envío o procesamiento
  };

  const handleStepClick = (step) => {
    setCurrentStep(step); // Cambia el estado al paso correspondiente
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Función para manejar la selección de método de pago
  const handlePaymentChange = (selectedPayment) => {
    setPayment(selectedPayment); // Actualiza el contexto con el método de pago seleccionado
  };

  return (
    <div>
      <Stepper step={3} handleStepClick={handleStepClick} />
      <div className="pt-10 gap-4 grid md:grid-cols-4 sm:grid-cols-1 mx-2">
        <div
          id="datos"
          className="lg:col-span-3 md:col-span-3 p-10 border rounded-md"
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <h1 className="text-xl pb-4 text-center">Opciones de Pago</h1>

            {/* Mostrar estado de carga */}
            {paymentData.loading && <p>Cargando opciones de pago...</p>}

            {/* Mostrar error si existe */}
            {paymentData.error && (
              <div className="text-red-600">Error: {paymentData.error}</div>
            )}

            {/* Renderizar las opciones de pago */}
            <ul className="grid w-full gap-6 md:grid-cols-1">
              {paymentData.data?.data &&
                paymentData.data.data.map((paymentOption) => (
                  <li key={paymentOption.id}>
                    <input
                      type="radio"
                      id={`payment${paymentOption.id}`}
                      name="payment"
                      value={paymentOption.id}
                      className="hidden peer"
                      onChange={() => handlePaymentChange(paymentOption.name)} // Guardar el nombre del método de pago
                      checked={paymentMethod === paymentOption.name} // Verificar si el método seleccionado coincide
                      required
                    />
                    <label
                      htmlFor={`payment${paymentOption.id}`}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="flex-grow">
                        <div className="w-full text-lg font-semibold">
                          {paymentOption.name}
                        </div>
                        <div className="w-full">{paymentOption.desc}</div>
                      </div>
                      {paymentOption.cover && (
                        <div className="ml-4 flex-shrink-0">
                          <img
                            src={API_URL + paymentOption.cover.url}
                            className="mt-2 w-100 h-20 object-contain" // Ajustar tamaño según sea necesario
                            alt={paymentOption.name}
                          />
                        </div>
                      )}
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
    </div>
  );
}
