import { useEffect, useRef, useState } from "react";
import { Spinner } from "flowbite-react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { WebpayPlus } from "transbank-sdk"; // ES6

//HOOKS
import usePayment from "../hooks/usePayment";
import { useCart } from "../hooks/useCart";
//COMPONENTS
import FormatCLP from "./FormateadorCLP";
import Title from "./Title";
import Stepper from "./Stepper";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Step4({ setCurrentStep }) {
  const { cart, total } = useCart(); // Ahora obtenemos `paymentMethod` desde el contexto
  const { readPayment, paymentData } = usePayment();

  const paymentMethod = cart.payment;

  const handleClick = async () => {
    try {
      const buyOrder = `order-${new Date().getTime()}`; // Orden de compra única
      const sessionId = `session-${new Date().getTime()}`; // ID de sesión único
      const amount = Math.round(
        total / (1 - (119 * paymentMethod.recargo) / 10000)
      );

      // Monto total a pagar (del carrito)
      const returnUrl = `${window.location.origin}/payment`; // URL de retorno después del pago

      // Enviar solicitud al backend para crear la transacción
      const response = await axios.post(
        `${apiUrl}/api/webpay/create-transaction`,
        {
          buyOrder,
          sessionId,
          amount,
          returnUrl,
        }
      );

      const { token, url } = response.data;

      // Crear un formulario dinámico para redirigir al usuario a Webpay
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "token_ws";
      tokenInput.value = token;

      form.appendChild(tokenInput);
      document.body.appendChild(form);

      form.submit(); // Redirigir al usuario a Webpay para procesar el pago
    } catch (error) {
      console.error("Error al procesar la transacción:", error);
    }
  };

  const shippingInfo = cart.ship;

  const formRef = useRef(null);
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
                        src={`${apiUrl}/uploads/${data.frontImage}`}
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
                      <span className="text-lg">{shippingInfo.nameShipp}</span>
                      <div className="ml-auto text-right text-lg">
                        {shippingInfo.typeShipp === "porpagar" && `Por Pagar`}
                        {shippingInfo.typeShipp === "normal" && (
                          <FormatCLP precio={shippingInfo.priceShipp} />
                        )}
                        {shippingInfo.typeShipp === "tienda" && `Gratis`}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg uppercase font-bold pt-2 text-right">
                    Total
                  </h2>

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
              </div>

              <div className="border rounded-md p-4 mb-2">
                <h1 className="uppercase pb-4">Método de entrega</h1>
                <div>
                  <span className="font-semibold">Seleccionado:</span>
                  <span>
                    {" "}
                    {shippingInfo.nameShipp + " "} ({shippingInfo.descShipp}){" "}
                    <span className="font-semibold">
                      <FormatCLP precio={shippingInfo.priceShipp} />
                    </span>
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