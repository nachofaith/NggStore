import { useState } from "react";
import axios from "axios";


const useRegister = () => {
  const [error, setError] = useState(null);


  const handleRegister = async (username, email, password, role) => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
        role,
      });
      //  navigate("/");
    } catch (error) {
      setError("datos incorrectos");
    }
  };

  return {
    handleRegister,
    error,
  };
};

export default useRegister;
