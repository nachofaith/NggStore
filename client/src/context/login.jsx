import { createContext, useState, useContext, React, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    const savedAuthState = localStorage.getItem("isAuthenticated");

    if (savedAuthState === "true") {
      setIsAuth(true);
      localStorage.setItem("isAuthenticated", "true");
    }


    const savedAdminState = localStorage.getItem("isAdmin");

    if (savedAdminState === "true") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
    }
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuthenticated", "true");

    const tokenJwt = localStorage.getItem("token");

    if (tokenJwt) {
      try {
        // Decodificar el token
        const decoded = jwtDecode(tokenJwt);
        const role = decoded.role

        if(role === "admin"){
          setIsAdmin(true)
          localStorage.setItem("isAdmin", "true");
        }

      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");

   
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isAdmin, setIsAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
