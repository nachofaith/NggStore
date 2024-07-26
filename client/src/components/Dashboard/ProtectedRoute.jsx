import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/login";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { isAuth, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    console.log("Autenticated?: " + isAuth);
    console.log("Admin?: " + isAdmin);

    if (!isLoading) {
      if (!isAuth || !isAdmin) {
        navigate("/404");
      } else {
        setIsRedirecting(false);
      }
    }
  }, [isAdmin, isAuth, navigate, isLoading]);

  if (isLoading || isRedirecting) {
    return <div>Loading...</div>; // O algún spinner de carga
  }

  return isAuth && isAdmin ? <Outlet /> : null;
};

export default ProtectedRoute;
