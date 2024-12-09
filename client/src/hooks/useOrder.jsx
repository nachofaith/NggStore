import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
const API_TOKEN = import.meta.env.VITE_API_TOKEN; // Token de la API

const useOrder = () => {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [pedido, setPedido] = useState(null);

  const createOrder = async (cart, total, formData) => {
    setLoading(true);
    setError(null);

    try {
      // Consulta la última orden
      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          sort: ["createdAt:desc"],
          "pagination[limit]": 1,
        },
      });

      const lastOrder = response.data.data[0]?.orden || "ORD-0";
      const match = lastOrder.match(/ORD-(\d+)/);
      const lastOrderNumber = match ? parseInt(match[1], 10) : 0;
      const newOrderNumber = `ORD-${(lastOrderNumber + 1)
        .toString()
        .padStart(5, "0")}`;

      setPedido(newOrderNumber);

      // Validar stock de todos los productos
      for (const product of cart.items) {
        const response = await axios.get(
          `${API_URL}/api/products/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        const currentStock = response.data.data.stock;
        if (currentStock < product.quantity) {
          setError(
            `El producto ${product.nombreProd} no tiene suficiente stock. Disponible: ${currentStock}, requerido: ${product.quantity}.`
          );
          setLoading(false);
          return; // Detener el flujo si no hay suficiente stock
        }
      }

      // Actualizar stock de los productos
      for (const product of cart.items) {
        const response = await axios.get(
          `${API_URL}/api/products/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        const currentStock = response.data.data.stock;
        const newStock = currentStock - product.quantity;

        const updatePayload = {
          data: {
            stock: newStock,
          },
        };

        await axios.put(
          `${API_URL}/api/products/${product.id}`,
          updatePayload,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          `Stock actualizado para el producto ${product.id}. Nuevo stock: ${newStock}`
        );
      }

      // Preparar los datos para enviar
      const orderPayload = {
        data: {
          orden: newOrderNumber,
          date: new Date().toISOString(),
          state: "en espera de pago",
          mail: formData?.email1 || "N/A",
          first_name: formData?.nombre || "N/A",
          last_name: formData?.apellido || "N/A",
          phone: formData?.phone || "N/A",
          address: formData?.address || "N/A",
          OrderProduct: cart.items.map((product) => ({
            idProd: product.id,
            name: product.nombreProd,
            quantity: product.quantity,
            price: product.precioProd,
          })),
          total: total,
        },
      };

      // Crear la nueva orden
      await axios.post(`${API_URL}/api/orders`, orderPayload, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    pedido,
    setLoading,
    loading,
    error,
  };
};

export default useOrder;
