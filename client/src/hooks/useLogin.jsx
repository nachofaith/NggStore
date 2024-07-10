import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
      login();
    } catch (error) {
      setError(error.data);
    }
  };

  return {
    handleLogin,
    error,
  };
};

export default useLogin;
