import { useState } from "react";
import axios from "axios";

// const token = import.meta.env.VITE_API_TOKEN;

export default function useRegister() {
  const [error, setError] = useState(null);

  const handleRegister = async (first_name, last_name, email, password) => {
    try {
      // 1. Registro del usuario con los campos básicos
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: email, // Usamos el email como username
          email,
          password,
        }
      );

      const userId = response.data.user.id; // Obtenemos el ID del usuario registrado
      const token = response.data.jwt; // Obtenemos el token JWT del usuario registrado

      // 2. Actualizamos el usuario con los campos adicionales (first_name, last_name)
      await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        { first_name, last_name },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agregamos el token JWT en los headers
          },
        }
      );

      console.log("Registro y actualización exitosos:", response.data);
      return true;
    } catch (err) {
      console.error(
        "Error en el registro o actualización:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.error?.message || "Error en el registro");
      return false;
    }
  };

  return { handleRegister, error };
}
