import { useState, useEffect, useId } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
const API_KEY = import.meta.env.VITE_API_TOKEN;

const useAddress = () => {
  const [formData, setFormData] = useState({
    region: "",
    ciudad: "",
    comuna: "",
    street: "",
    opcional: "",
  });
  const [addresses, setAddresses] = useState([]); // Estado para almacenar las direcciones
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const resetFormData = () => {
    setFormData({
      region: "",
      ciudad: "",
      comuna: "",
      street: "",
      opcional: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAddress = async (formData, userId) => {
    console.log(userId);

    try {
      const response = await axios.post(
        `${API_URL}/api/addresses`,
        {
          data: {
            ...formData, // Incluye los datos del formulario
            user: userId, // Usa el nuevo nombre de campo aquí
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`, // Asegúrate de que el token esté correcto
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Retorna la dirección creada
    } catch (error) {
      console.error(
        "Error en la solicitud:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error al hacer la solicitud: " + error.message);
    }
  };

  const fetchAddresses = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const userToken = localStorage.getItem("token"); // Token del usuario

      // Agregar el filtro por usuario en la URL
      const response = await axios.get(
        `${API_URL}/api/addresses?filters[user][id]=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response.data); // Log para verificar la respuesta de la API
      setAddresses(response.data.data); // Almacena las direcciones en el estado (ajusta según la estructura de respuesta)
    } catch (err) {
      setError(err.message);
    } 
  };

  useEffect(() => {
    fetchAddresses(); // Llama a fetchAddresses al cargar el hook
  }, []);

  return {
    formData,
    setFormData,
    resetFormData,
    handleInputChange,
    handleSelectChange,
    addAddress,
    fetchAddresses, // Función para obtener direcciones
    addresses, // Lista de direcciones
    loading, // Estado de carga
    setLoading,
    error, // Estado de error
  };
};

export default useAddress;
