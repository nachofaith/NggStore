import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [error, setError] = useState(null);

  const handleRegister = async (nombreCat) => {
    try {
      const response = await axios.post("http://localhost:3000/catRegister", {
        nombreCat,
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      setError("datos incorrectos" + error);
    }
  };


  const handleRegisterSub = async (idSubCat, nombreSubCat) => {
    try {
      const response = await axios.post("http://localhost:3000/subCatRegister", {
        idSubCat,
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
