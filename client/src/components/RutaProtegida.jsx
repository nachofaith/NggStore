import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ element }) {
  const { user, loading } = useAuth(); // También obtenemos el estado de carga

  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga mientras espera
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirige a la página de login si no está autenticado
  }

  return element; // Renderiza el componente protegido si está autenticado
}

export default RutaProtegida;
