import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [error, setError] = useState(null);

  const handleRegister = async (nombreMarca) => {
    try {
      const response = await axios.post("http://localhost:3000/marcaRegister", {
        nombreMarca,
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      setError("datos incorrectos" + error);
    }
  };

  return {
    handleRegister,
    error,
  };
};

export default useRegister;
