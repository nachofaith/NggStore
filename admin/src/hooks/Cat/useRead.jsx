import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useRead = (id) => {
  const [data, setData] = useState(null);
  const [subCat, setSubCat] = useState([]);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/readCategoria`, {
        id,
      });

      // Crear el arreglo de subcategorías incluyendo nombre e id
      const subCatArray = response.data.subCategorias && response.data.subCategoriasIds
        ? response.data.subCategorias.split(", ").map((nombre, index) => ({
            id: response.data.subCategoriasIds.split(", ")[index],
            nombre: nombre,
          }))
        : [];

      setData(response.data);
      setSubCat(subCatArray);
    } catch (error) {
      setError("Datos incorrectos: " + error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    data,
    subCat,
    error,
    fetchData,
  };
};

export default useRead;
