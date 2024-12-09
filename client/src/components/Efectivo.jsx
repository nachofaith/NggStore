import { useCart } from "../hooks/useCart";
import Title from "./Title";
import FormatCLP from "./FormateadorCLP";
import { useEffect, useState } from "react";
import useOrder from "../hooks/useOrder";
import { Spinner } from "flowbite-react";
import Resumen from "./Resumen";

export default function Efectivo({ onError }) {
  const { cart, total } = useCart(); // Obtiene el total del carrito
  const { createOrder, pedido, loading, setLoading, error } = useOrder(); // Asegúrate de ejecutar el hook correctamente
  const [formData, setFormData] = useState(null);

  // Incluye createOrder en las dependencias si proviene de un hook

  useEffect(() => {
    if (pedido) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [pedido]);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if ((cart, total, formData)) {
      createOrder(cart, total, formData); // Llama a la función para crear una orden al cargar el componente
    }
  }, [cart, total, formData]);

  useEffect(() => {
    if (error) {
      onError(error); // Comunica el error al componente padre
    }
  }, [error, onError]);

  return (
    <>
      {loading ? (
        <div className="text-center h-screen">
          <Spinner
            color="success"
            aria-label="Info spinner example"
            size="xl"
          />
        </div>
      ) : (
        <div className="h-screen container mx-auto lg:col-span-3 md:col-span-3 p-10">
          <Title text={`Pedido generado - ORDEN #${pedido}`} />
          <div className="flex flex-col border rounded-md p-4 mb-2">
            <h1 className="font-semibold text-xl uppercase text-center p-4">
              Detalles de Pago por Transferencia
            </h1>
            <div className="text-lg">
              <p>Banco: Banco de Chile</p>
              <p>Cuenta: 123456789</p>
              <p>Tipo de cuenta: Corriente</p>
              <p>Rut: 77.306.351-6</p>
              <p>Email: contacto@ngg.cl</p>
              <p>
                Monto a Transferir: <FormatCLP precio={total} />
              </p>
              <p>Descripción: Indique orden de compra #ORD-XXXX</p>
            </div>
          </div>
          <div>
            <Resumen button={"OFF"}/>
          </div>
        </div>
      )}
    </>
  );
}
