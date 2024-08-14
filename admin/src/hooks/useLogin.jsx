import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      login();
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        // Capturar el mensaje de error específico del servidor si está disponible
        setError(
          err.response.data.message || "Login failed. Please try again."
        );
      } else {
        // Capturar un mensaje de error general
        setError("An error occurred. Please try again.");
      }
    }
  };

  return {
    handleLogin,
    error,
  };
};

export default useLogin;
