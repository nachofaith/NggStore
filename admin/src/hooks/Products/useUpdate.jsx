import { useState } from "react";
import axios from "axios";

const useUpdate = () => {
  const [errorDel, setErrorDel] = useState(null);

  const handleUpdate = async (idMarca, nombreMarca) => {
    try {
      const response = await axios.post("http://localhost:3000/marcaUpdate", {
        idMarca,
        nombreMarca
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
