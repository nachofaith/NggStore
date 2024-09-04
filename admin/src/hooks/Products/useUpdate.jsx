import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const useUpdate = () => {
  const [error, setError] = useState(null);

  const handleUpdate = async (idProd, nombreProd, descProd, selectedMarca, stock, precioProd, precioProdOff, selectedCategory, selectedSubcategory) => {
    console.log(idProd, nombreProd, descProd, selectedMarca, stock, precioProd, precioProdOff, selectedCategory, selectedSubcategory)
    try {
      const response = await axios.post(`${apiUrl}/productoUpdate/`, {
        idProd, nombreProd, descProd, selectedMarca, stock, precioProd, precioProdOff, selectedCategory, selectedSubcategory,
      });
      console.log("Respuesta del servidor:", response.data);
      // O maneja el response de alguna otra forma
    } catch (error) {
      setError("datos incorrectos" + error);
    }
  };

  return {
    handleUpdate,
    error,
  };
};

export default useUpdate;


