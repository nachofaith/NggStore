import { useState, useEffect, useId } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
const API_KEY = import.meta.env.VITE_API_TOKEN;

const useCat = () => {
  const [cat, setCat] = useState([]);
  const [singleCat, setSingleCat] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchCat = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      setCat(response.data.data); // Almacena las direcciones en el estado (ajusta según la estructura de respuesta)
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchSingleCat = async (idCat) => {
    if (!idCat) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/categories?filters[id][$eq]=${idCat}&fields=name`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setSingleCat(response.data.data); // Almacena las direcciones en el estado (ajusta según la estructura de respuesta)
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCat(); // Llama a fetchAddresses al cargar el hook
  }, []);

  return {
    fetchCat,
    fetchSingleCat,
    cat,
    singleCat,
    setLoading,
    loading,
    error,
  };
};

export default useCat;
