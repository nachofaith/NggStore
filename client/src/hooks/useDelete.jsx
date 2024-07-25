import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDelete = () => {
  const [errorDel, setErrorDel] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (email) => {
    try {
      const response = await axios.post("http://localhost:3000/delete", {
        email,
      });
    } catch (error) {
      setErrorDel("datos incorrectos"+error);
    }
  };

  return {
    handleDelete,
    errorDel,
  };
};

export default useDelete;
