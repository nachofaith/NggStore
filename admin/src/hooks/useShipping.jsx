import { useState, useCallback } from "react";
import axios from "axios";

const useShipping = () => {
  const [error, setError] = useState(null);
  const [shippingData, setShippingData] = useState([]);
  const [shippingDetails, setShippingDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const createShip = useCallback(
    async (nameShip, descShip, priceShip, typeShip) => {
      console.log(nameShip, descShip, priceShip, typeShip);
      if (!nameShip || !priceShip || isNaN(priceShip) || !typeShip) {
        setError("Please provide valid data");
        return { success: false, error: "Invalid data" };
      }

      setError(null);

      try {
        const response = await axios.post(`${apiUrl}/shipping/createShip`, {
          nameShip,
          descShip,
          priceShip,
          typeShip,
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

  const readShip = useCallback(async () => {
    setError(null);

    try {
      const response = await axios.get(`${apiUrl}/shipping/readShip`);
      setShippingData(response.data);
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

  const readShipById = useCallback(
    async (id) => {
      if (!id) {
        setError("Please provide a valid ID");
        return { success: false, error: "Invalid ID" };
      }

      setError(null);

      try {
        const response = await axios.get(
          `${apiUrl}/shipping/readShipById/${id}`
        );
        setShippingDetails(response.data);
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

  const updateShip = useCallback(
    async (id, nameShip, descShip, priceShip, typeShip) => {
      if (!id || !nameShip || !priceShip || isNaN(priceShip) || !typeShip) {
        setError("Please provide valid data");
        return { success: false, error: "Invalid data" };
      }

      setError(null);

      try {
        const response = await axios.put(
          `${apiUrl}/shipping/updateShip/${id}`,
          {
            nameShip,
            descShip,
            priceShip,
            typeShip,
          }
        );

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
    readShipById,
    updateShip,
    deleteShip,
    shippingData,
    error,
    shippingDetails,
  };
};

export default useShipping;
