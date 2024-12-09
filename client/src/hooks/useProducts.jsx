import { useState, useEffect, useId } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APIV2_URL; // URL base de la API
const API_KEY = import.meta.env.VITE_API_TOKEN;

const useProducts = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar las direcciones
  const [productsByCat, setProductsByCat] = useState([]); // Estado para almacenar las direcciones
  const [productById, setProductById] = useState([])
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/products?populate=cover`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setProducts(response.data.data); // Almacena las direcciones en el estado (ajusta según la estructura de respuesta)
    } catch (err) {
      setError(err.message);
    } 
  };

  const fetchProductsByCat = async (idCat) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/products?populate=cover&filters[category][id][$eq]=${idCat}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setProductsByCat(response.data.data);
      console.log("Productos por categoría:", response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };


  const fetchSingleProduct = async (idProd) => {
    setLoading(true);
    setError(null);
    try {
      const responseSingleProduct = await axios.get(
        `${API_URL}/api/products/${idProd}?populate=images&populate=cover&populate=brand`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
     
      setProductById(responseSingleProduct.data.data);
      console.log("Producto por id:", responseSingleProduct.data.data);
    } catch (err) {
      setError(err.message);
    }
  };


  return {
    fetchProducts, // Función para obtener direcciones
    fetchProductsByCat,
    fetchSingleProduct,
    productsByCat,
    products,
    productById,
    setLoading,
    loading, // Estado de carga
    error, // Estado de error
  };
};

export default useProducts;
