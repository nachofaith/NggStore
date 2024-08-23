import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useDelete = () => {
  const [errorDel, setErrorDel] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/deleteProd`, {
        id,
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      setErrorDel("datos incorrectos" + error);
    }
  };

  return {
    handleDelete,
    errorDel,
  };
};

export default useDelete;
