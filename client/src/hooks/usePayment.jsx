import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
const API_TOKEN = import.meta.env.VITE_API_TOKEN; // Token de la API

const usePayment = () => {
  const [paymentData, setPaymentData] = useState({ data: null, error: null, loading: false });

  // Función para leer los pagos
  const readPayment = useCallback(async () => {
    setPaymentData({ data: null, error: null, loading: true }); // Inicia la carga y resetea data/error
    try {
      const response = await axios.get(`${API_URL}/api/payments?populate=cover`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`, // Incluye el token en la cabecera
          "Content-Type": "application/json",
        },
      });

      setPaymentData({ data: response.data, error: null, loading: false }); // Guarda los datos y termina la carga
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response
        ? `Error: ${error.response.status} - ${error.response.data.message}`
        : error.request
        ? "Error: No response from the server. Please try again later."
        : `Error: ${error.message}`;

      setPaymentData({ data: null, error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    readPayment,
    paymentData, // Devuelve los datos, error y estado de carga en un solo objeto
  };
};

export default usePayment;
