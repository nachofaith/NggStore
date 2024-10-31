import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación

export default function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el contexto de autenticación para almacenar los datos del usuario

  const API_URL = import.meta.env.VITE_APIV2_URL;

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null); // Limpiar errores previos

    try {
      // Hacer la solicitud para obtener el JWT
      const response = await axios.post(`${API_URL}/api/auth/local`, {
        identifier: email,
        password: password,
      });

      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt); // Almacenar el JWT en localStorage (opcional)

      // Obtener datos del usuario usando el JWT
      const userResponse = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const userData = userResponse.data;

      // Actualizar el contexto de autenticación con el usuario y el token
      login(userData, jwt);

      // Redirigir al perfil
      navigate("/profile");

      console.log("Inicio de sesión exitoso");
      return true; // Devolvemos true si el login fue exitoso
    } catch (err) {
      console.error(
        "Error en el login:",
        err.response ? err.response.data : err.message
      );
      setError("Credenciales incorrectas. Por favor intenta nuevamente.");
      return false; // Devolvemos false si hubo un error
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleLogin };
}
