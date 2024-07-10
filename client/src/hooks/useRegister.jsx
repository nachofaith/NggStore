import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const useRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 

  const handleRegister = async (username, email, password, role) => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
        role,
      });
  

      navigate("/dashboard");
      
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