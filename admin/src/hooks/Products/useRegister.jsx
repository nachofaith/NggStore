import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRegister = async (nombreProd, descProd, stockProd, precioProd, precioProdOff, selectedMarca, selectedCategory, selectedSubcategory) => {
    try {
      const response = await axios.post(`${apiUrl}/registerProd`, {
        nombreProd, 
        descProd,
        stockProd,
        precioProd, 
        precioProdOff,
        selectedMarca,
        selectedCategory, 
        selectedSubcategory,
      });
  
      console.log("Respuesta del servidor:", response.data);
  
      // Retornar la respuesta para poder usarla en handleSubmit
      return response;
    } catch (error) {
      setError("Datos incorrectos: " + error.message);
      // También podrías relanzar el error si necesitas manejarlo más arriba
      throw error;
    }
  };


  const handleRegisterSub = async (idCat, nombreSubCat) => {
    try {
      const response = await axios.post(`${apiUrl}/products`, {
        idCat,
        nombreSubCat,
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      setError("datos incorrectos" + error);
    }
  };

  return {
    handleRegister,
    handleRegisterSub,
    error,
  };
};

export default useRegister;
