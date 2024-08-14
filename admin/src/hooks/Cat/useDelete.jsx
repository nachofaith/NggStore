import { useState } from "react";
import axios from "axios";

const useDelete = () => {
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/catDelete", {
        id,
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      setError("datos incorrectos" + error);
    }
  };

  return {
    handleDelete,
    error,
  };
};

export default useDelete;
