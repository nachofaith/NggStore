import { React } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/login";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  if (!isAuth) {
    return navigate("/");;
  }

  return <Outlet />;
};

export default ProtectedRoute;
