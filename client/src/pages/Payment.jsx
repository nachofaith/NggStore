import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Title from "../components/Title";
import FormatCLP from "../components/FormateadorCLP";
import { CartContext } from "../context/cart"; // Importar el contexto del carrito
import usePayment from "../hooks/usePayment";
import { Spinner } from "flowbite-react";
const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_APIV2_URL;
import { useNavigate } from "react-router-dom"; // Importa useNavigate


const Payment = () => {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCashOrTransfer, setIsCashOrTransfer] = useState(false); // Nuevo estado
  const location = useLocation();

  const { cart, total } = useContext(CartContext); // Usar el contexto del carrito
  const { readPayment, paymentData } = usePayment();
  const shippingInfo = cart.ship;
  const paymentMethod = cart.payment;
  const navigate = useNavigate();

  useEffect(() => {
    readPayment();
  }, [readPayment]);

    // Verificar que el usuario ha completado los pasos anteriores
    useEffect(() => {
      if (!cart || !cart.items.length || !cart.ship || !cart.payment) {
        // Si falta información esencial, redirige al paso inicial del checkout
        navigate("/checkout");
        return;
      }
    }, [cart, navigate]);

  useEffect(() => {
    // Obtener el token_ws de la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token_ws");

    if (token) {
      // Enviar el token al backend para confirmar la transacción
      const confirmTransaction = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}/api/webpay/confirm-transaction`,
            { token }
          );
          setTransactionDetails(response.data); // Guardar los detalles de la transacción
        } catch (error) {
          setError(
            "Hubo un error al confirmar la transacción. Inténtalo de nuevo."
          );
          console.error("Error al confirmar la transacción:", error);
        }
      };

      confirmTransaction();
    } else {
      // Si no hay token, el pago se realizó con efectivo o transferencia
      setIsCashOrTransfer(true);
      setLoading(false); // Desactivar el spinner inmediatamente
    }
  }, [location]);

  if (error) {
    return <div className="h-screen md:container mx-auto">{error}</div>;
  }

  useEffect(() => {
    if (transactionDetails !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [transactionDetails]);

  if (loading) {
    return (
      <div className="text-center h-screen">
        <Spinner color="success" aria-label="Info spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="h-screen md:container mx-auto">
      <Title text="Orden Realizada" align="center" />
      <p className="text-center text-xl pb-8">
        A continuación podrá ver el detalle
      </p>

      {isCashOrTransfer ? (
        // Información de pago para transferencia
        <div className="border rounded-md p-4 mb-2">
          <h2 className="text-lg font-semibold">
            Detalles de Pago por Transferencia
          </h2>
          <p>
            <strong>Banco: </strong> Banco Ejemplo
          </p>
          <p>
            <strong>Cuenta: </strong> 123456789
          </p>
          <p>
            <strong>Tipo de cuenta: </strong> Corriente
          </p>
          <p>
            <strong>Rut: </strong> 12.345.678-9
          </p>
          <p>
            <strong>Email: </strong> pago@ejemplo.com
          </p>
          <p>
            <strong>Monto a Transferir: </strong>
            <FormatCLP precio={total} />
          </p>
          <p>
            <strong>Descripción: </strong> Indique su nombre y orden de compra
          </p>
        </div>
      ) : (
        // Detalle de la transacción Webpay
        <div className="border rounded-md p-4 mb-2">
          <p>
            <strong>Orden de Compra: </strong> {transactionDetails.buy_order}
          </p>
          <p>
            <strong>Tipo de pago: </strong>{" "}
            {transactionDetails.payment_type_code}
          </p>
          <p>
            <strong>Monto: </strong>
            <FormatCLP precio={transactionDetails.amount} />
          </p>
          <p>
            <strong>Estado: </strong> {transactionDetails.status}
          </p>
          <p>
            <strong>Código de Autorización:</strong>{" "}
            {transactionDetails.authorization_code}
          </p>
          <p>
            <strong>Fecha de Transacción:</strong>{" "}
            {transactionDetails.transaction_date}
          </p>
        </div>
      )}

      {/* Detalle del carrito de compras */}
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
                {shippingInfo.price > 0 && (
                  <FormatCLP precio={shippingInfo.price} />
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg uppercase font-bold pt-2 text-right">Total</h2>

          {/* Mostrar solo el método de pago seleccionado o todos si no hay selección */}
          {paymentMethod &&
          paymentData.data?.data.some(
            (paymentOption) => paymentOption.name === paymentMethod.name
          ) ? (
            paymentData.data?.data
              .filter(
                (paymentOption) => paymentOption.name === paymentMethod.name
              )
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
          ) : (
            <p className="text-lg font-semibold text-right">
              <FormatCLP precio={total} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
