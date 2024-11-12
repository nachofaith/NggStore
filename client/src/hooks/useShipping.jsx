import { useState, useCallback } from "react";
import axios from "axios";

const useShipping = () => {
  const [error, setError] = useState(null);
  const [shippingData, setShippingData] = useState([]);

  const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
  const API_KEY = import.meta.env.VITE_API_TOKEN;

  const apiUrl = import.meta.env.VITE_API_URL;

  const createShip = useCallback(
    async (nameShip, descShip, priceShip) => {
      if (!nameShip || !priceShip || isNaN(priceShip)) {
        setError("Please provide valid data");
        return { success: false, error: "Invalid data" };
      }

      setError(null);

      try {
        const response = await axios.post(`${apiUrl}/shipping/createShip`, {
          nameShip,
          descShip,
          priceShip,
        });

        return { success: true, data: response.data };
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
        } else if (error.request) {
          setError(
            "Error: No response from the server. Please try again later."
          );
        } else {
          setError("Error: " + error.message);
        }

        // Retornar fracaso y el mensaje de error
        return { success: false, error: error.message };
      }
    },
    [apiUrl]
  );

  const readShip = useCallback(async () => {
    setError(null); // Resetea el error

    try {
      // Agregar el filtro por usuario en la URL
      const response = await axios.get(`${API_URL}/api/ships`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      setShippingData(response.data.data); // Almacena los datos obtenidos
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        setError(
          `Error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        setError("Error: No response from the server. Please try again later.");
      } else {
        setError("Error: " + error.message);
      }

      return { success: false, error: error.message };
    }
  }, [apiUrl]);

  const deleteShip = useCallback(
    async (id) => {
      if (!id) {
        setError("Please provide a valid ID");
        return { success: false, error: "Invalid ID" };
      }

      setError(null);

      try {
        const response = await axios.delete(`${apiUrl}/shipping/deleteShip`, {
          data: { id },
        });

        return { success: true, data: response.data };
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
        } else if (error.request) {
          setError(
            "Error: No response from the server. Please try again later."
          );
        } else {
          setError("Error: " + error.message);
        }

        return { success: false, error: error.message };
      }
    },
    [apiUrl]
  );

  return {
    createShip,
    readShip,
    deleteShip,
    shippingData,
    error,
  };
};

export default useShipping;
