import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuth) {
        navigate("/login"); // Redirige al login si no está autenticado
      }
    }
  }, [isAuth, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // O algún spinner de carga
  }

  return isAuth ? <Outlet /> : null;
};

export default ProtectedRoute;
