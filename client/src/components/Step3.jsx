import { useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";
import usePayment from "../hooks/usePayment";
import Resumen from "./Resumen";
import { useCart } from "../hooks/useCart";

const API_URL = import.meta.env.VITE_APIV2_URL;

export default function Step3({ setCurrentStep }) {
  const formRef = useRef(null);
  const { cart, setPayment } = useCart();
  const { readPayment, paymentData } = usePayment();
  const [errorRadio, setErrorRadio] = useState(null);

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    readPayment();
  }, [readPayment]);

  const paymentMethod = cart.payment;

  const handleClick = () => {
    if (formRef.current && formRef.current.reportValidity() && !errorRadio) {
      formRef.current.requestSubmit();
      setCurrentStep(4); // Cambia al siguiente paso
    } else {
      setErrorRadio(true);
      console.log("El formulario contiene errores.");
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePaymentChange = (selectedPayment) => {
    setErrorRadio(null);
    setPayment(selectedPayment); // Establecer el método de pago seleccionado
  };

  if (paymentData.loading) {
    return <p>Cargando opciones de pago...</p>;
  }

  if (paymentData.error) {
    return <div>Error: {paymentData.error}</div>;
  }

  return (
    <div>
      <Stepper step={3} handleStepClick={handleStepClick} />
      <div className="pt-10 gap-4 grid md:grid-cols-4 sm:grid-cols-1">
        <div
          id="datos"
          className="lg:col-span-3 md:col-span-3 p-10 border rounded-md"
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <h1 className="text-xl pb-4 text-center">Opciones de Pago</h1>
            {errorRadio && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span> Debe elegir un
                método de pago.
              </div>
            )}

            <ul className="grid w-full gap-6 md:grid-cols-1">
              {paymentData.data?.data.map((paymentOption) => (
                <li key={paymentOption.id}>
                  <input
                    type="radio"
                    id={`payment${paymentOption.id}`}
                    name="payment"
                    value={paymentOption.id}
                    className="hidden peer"
                    onChange={() => handlePaymentChange(paymentOption)} // Pasar el objeto completo
                    checked={paymentMethod?.id === paymentOption.id} // Verifica si esta opción es la seleccionada
                    required
                  />
                  <label
                    htmlFor={`payment${paymentOption.id}`}
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
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
                          className="mt-2 w-100 h-20 object-contain"
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
