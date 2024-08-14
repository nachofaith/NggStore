import { useState } from "react";
import axios from "axios";

const useDelete = () => {
  const [errorDel, setErrorDel] = useState(null);

  const handleDelete = async (id_marca) => {
    try {
      const response = await axios.post("http://localhost:3000/marcaDelete", {
        id_marca,
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
