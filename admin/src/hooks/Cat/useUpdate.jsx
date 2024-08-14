import { useState } from "react";
import axios from "axios";

const useUpdate = () => {
  const [errorDel, setErrorDel] = useState(null);

  const handleUpdate = async (id, name) => {
    try {
      const response = await axios.post("http://localhost:3000/catUpdate", {
        id,
        name
      });
      console.log("Respuesta del servidor:", response.data);
      // O maneja el response de alguna otra forma
    } catch (error) {
      setErrorDel("datos incorrectos" + error);
    }
  };

  return {
    handleUpdate,
    errorDel,
  };
};

export default useUpdate;
