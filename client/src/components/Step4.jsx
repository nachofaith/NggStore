// Librerías y paquetes externos
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";

// Hooks personalizados
import usePayment from "../hooks/usePayment";
import { useCart } from "../hooks/useCart";

// Componentes locales
import FormatCLP from "./FormateadorCLP";
import Stepper from "./Stepper";
import Title from "./Title";

// Variables y constantes
const API_URL = import.meta.env.VITE_APIV2_URL;
const apiUrl = import.meta.env.VITE_API_URL;

export default function Step4({ setCurrentStep }) {
  const { cart, total, currentStep } = useCart(); // Ahora obtenemos `paymentMethod` desde el contexto
  const { readPayment, paymentData } = usePayment();

  const navigate = useNavigate(); // Inicializa useNavigate
  const paymentMethod = cart.payment;

  const handleClick = async () => {
    if (paymentMethod.name === "Efectivo o Transferencia") {
      if (currentStep === 4) {
        navigate("/payment");
      }
    } else {
      try {
        const amount = Math.round(
          total / (1 - (119 * paymentMethod.recargo) / 10000)
        );

        const urlReturn = "http://localhost:5174/payment"; // URL de retorno
        const urlConfirmation = "http://localhost:5174/payment";

        // Enviar solicitud al backend para crear la transacción
        const response = await axios.post(`${apiUrl}/api/flow`, {
          amount,
          urlReturn,
          urlConfirmation,
          email: formData.email1,
        });

        const { redirectUrl } = response.data;
        console.log(redirectUrl);

        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error al procesar la transacción:", error);
      }
    }
  };

  const shippingInfo = cart.ship;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData !== null || cart !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [formData]);

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    readPayment();
  }, [readPayment]);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleStepClick = (step) => {
    setCurrentStep(step); // Cambia el estado al paso correspondiente
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Stepper step={4} handleStepClick={handleStepClick} />
      <div className="pt-10">
        <div
          id="datos"
          className="lg:col-span-3 md:col-span-3 p-10 border rounded-md"
        >
          {loading ? (
            <div className="text-center">
              <Spinner
                color="success"
                aria-label="Info spinner example"
                size="xl"
              />
            </div>
          ) : (
            <div className="">
              <Title text="Resumen de Compra" align="center" />

              <div className="border rounded-md p-4 mb-2">
                <h1 className="pb-4 uppercase">Producto(s)</h1>

                <div className="flex flex-col gap-2 justify-center">
                  {cart.items.map((data) => (
                    <div
                      key={data.id}
                      className="flex flex-row gap-2 items-center justify-between border-b"
                    >
                      <img
                        src={`${API_URL}/${data.frontImage}`}
                        alt={data.nombreProd}
                        className="w-16 h-16 object-contain rounded mr-4"
                      />
                      <div key={data.id}>
                        <h2 className="text-lg">{data.nombreProd}</h2>
                        <div className="flex flex-row gap-2 items-center">
                          {data.precioProdOff > 0 ? (
                            <>
                              <span className="line-through text-gray-500 text-sm">
                                <FormatCLP precio={data.precioProd} />
                              </span>
                              <span className="text-lg">
                                <FormatCLP precio={data.precioProdOff} />
                              </span>
                            </>
                          ) : (
                            <span className="text-lg">
                              <FormatCLP precio={data.precioProd} />
                            </span>
                          )}
                          <h3 className="text-gray-400">x {data.quantity}</h3>
                        </div>
                      </div>

                      <div className="ml-auto text-right">
                        {data.precioProdOff > 0 ? (
                          <span className="text-lg">
                            <FormatCLP
                              precio={data.precioProdOff * data.quantity}
                            />
                          </span>
                        ) : (
                          <span className="text-lg">
                            <FormatCLP
                              precio={data.precioProd * data.quantity}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {shippingInfo && (
                    <div className="flex flex-row gap-2 items-center justify-between border-b py-2">
                      <span className="text-lg">{shippingInfo.name}</span>
                      <div className="ml-auto text-right text-lg">
                        {shippingInfo.type === "Envío por pagar" && `Por Pagar`}
                        {shippingInfo.price === 0 &&
                          shippingInfo.type !== "Envío por pagar" &&
                          "GRATIS"}
                        {shippingInfo.price > 0 && (
                          <FormatCLP precio={shippingInfo.price} />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg uppercase font-bold pt-2 text-right">
                    Total
                  </h2>

                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex flex-col gap-2 justify-center">
                      <h3>Subtotal</h3>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <p className="text-lg font-medium">
                        <FormatCLP precio={total} />
                      </p>
                    </div>
                  </div>

                  {/* Mostrar solo el método de pago seleccionado o todos si no hay selección */}
                  {paymentMethod
                    ? paymentData.data?.data
                        .filter(
                          (paymentOption) =>
                            paymentOption.name === paymentMethod.name
                        ) // Mostrar solo el método seleccionado
                        .map((paymentOption) => (
                          <div
                            key={paymentOption.id}
                            className="flex flex-row gap-2 items-center justify-between"
                          >
                            <div className="flex flex-col gap-2 justify-center">
                              <h3>{paymentOption.name}</h3>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                              <p className="text-lg font-semibold">
                                {paymentOption.recargo > 0 ? (
                                  <FormatCLP
                                    precio={
                                      total /
                                      (1 -
                                        (119 * paymentOption.recargo) / 10000)
                                    }
                                  />
                                ) : (
                                  <FormatCLP precio={total} />
                                )}
                              </p>
                            </div>
                          </div>
                        ))
                    : paymentData.data?.data.map((paymentOption) => (
                        <div
                          key={paymentOption.id}
                          className="flex flex-row gap-2 items-center justify-between px-4"
                        >
                          <div className="flex flex-col gap-2 justify-center">
                            <h3>{paymentOption.name}</h3>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-lg font-semibold">
                              {paymentOption.recargo > 0 ? (
                                <FormatCLP
                                  precio={
                                    total /
                                    (1 - (119 * paymentOption.recargo) / 10000)
                                  }
                                />
                              ) : (
                                <FormatCLP precio={total} />
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              <div className="border rounded-md p-4 mb-2">
                <h1 className="pb-4 uppercase">Datos cliente</h1>
                <div>
                  <span className="font-semibold">Nombre:</span>
                  <span> {formData.nombre + " " + formData.apellido} </span>
                </div>
                <div>
                  <span className="font-semibold">Rut:</span>
                  <span> {formData.rut} </span>
                </div>
                <div>
                  <span className="font-semibold">Teléfono:</span>
                  <span> {formData.phone} </span>
                </div>
                <div>
                  <span className="font-semibold">Email:</span>
                  <span> {formData.email1} </span>
                </div>

                <h1 className="py-4 uppercase">Dirección</h1>
                <div>
                  <span className="font-semibold">Region:</span>
                  <span> {formData.region} </span>
                </div>
                <div>
                  <span className="font-semibold">Ciudad:</span>
                  <span> {formData.ciudad} </span>
                </div>
                <div>
                  <span className="font-semibold">Comuna:</span>
                  <span> {formData.comuna} </span>
                </div>
                <div>
                  <span className="font-semibold">Dirección:</span>
                  <span> {formData.direc} </span>
                </div>
                <div>
                  <span className="font-semibold">Información adicional:</span>
                  <span> {formData.opcional} </span>
                </div>
              </div>

              <div className="border rounded-md p-4 mb-2">
                <h1 className="uppercase pb-4">Método de entrega</h1>
                <div className="flex-col flex">
                  <span className="font-semibold">Seleccionado:</span>
                  <span>
                    {" "}
                    {shippingInfo.name + " "} ({shippingInfo.desc}){" "}
                    {shippingInfo.price === 0 ? (
                      ""
                    ) : (
                      <span className="font-semibold">
                        <FormatCLP precio={shippingInfo.price} />
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="border rounded-md p-4 mb-2">
                <h1 className="uppercase pb-4">Medio de pago</h1>

                <div>
                  <span className="font-semibold">Seleccionado: </span>
                  <span>
                    {paymentMethod.recargo > 0
                      ? `${paymentMethod.name} (Recargo: ${paymentMethod.recargo}%)`
                      : `${paymentMethod.name}`}
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="mt-4 w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-80 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
