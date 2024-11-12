import { useEffect, useState } from "react";
import FormatCLP from "../components/FormateadorCLP";
import { useCart } from "../hooks/useCart";
import usePayment from "../hooks/usePayment";

export default function Resumen({ onClick }) {
  const { cart, total } = useCart(); // Ahora obtenemos `paymentMethod` desde el contexto
  const { readPayment, paymentData } = usePayment();
  const shippingInfo = cart.ship;
  const paymentMethod = cart.payment;

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  useEffect(() => {
    readPayment();
  }, [readPayment]);

  return (
    <div className="w-auto h-auto border rounded-md flex flex-col">
      <h1 className="font-semibold text-xl uppercase text-center p-4">
        Resumen
      </h1>
      <div className="flex flex-col gap-2 justify-center p-4">
        {cart.items.map((data) => (
          <div
            key={data.id}
            className="flex flex-row gap-2 items-center justify-between border-b"
          >
            <div>
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
                  <FormatCLP precio={data.precioProdOff * data.quantity} />
                </span>
              ) : (
                <span className="text-lg">
                  <FormatCLP precio={data.precioProd * data.quantity} />
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
              {shippingInfo.price > 0 && <FormatCLP precio={shippingInfo.price} />}
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg uppercase font-bold px-4 text-right">Total</h2>

        {/* Mostrar solo el método de pago seleccionado o todos si no hay selección */}
        {paymentMethod
          ? paymentData.data?.data
              .filter(
                (paymentOption) => paymentOption.name === paymentMethod.name
              ) // Mostrar solo el método seleccionado
              .map((paymentOption) => (
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
                            total / (1 - (119 * paymentOption.recargo) / 10000)
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
                          total / (1 - (119 * paymentOption.recargo) / 10000)
                        }
                      />
                    ) : (
                      <FormatCLP precio={total} />
                    )}
                  </p>
                </div>
              </div>
            ))}
        <div className="w-full p-4">
          <a
            className="block w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2.5 text-center"
            onClick={handleClick}
            href="#"
          >
            Continuar
          </a>
        </div>
      </div>
    </div>
  );
}
