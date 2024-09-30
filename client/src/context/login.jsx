import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");
    const savedAdminState = localStorage.getItem("isAdmin");

    setIsAuth(savedAuthState === "true");
    setIsAdmin(savedAdminState === "true");

    // if (savedAuthState === "true") {
    //   setIsAuth(true);
    //   localStorage.setItem("isAuthenticated", "true");
    // }
    // if (savedAdminState === "true") {
    //   setIsAdmin(true);
    //   localStorage.setItem("isAdmin", "true");
    // }

    setIsLoading(false);
  }, []);

  const login = async () => {
    setIsAuth(true);
    localStorage.setItem("isAuthenticated", "true");

    const tokenJwt = localStorage.getItem("token");

    if (tokenJwt) {
      try {
        // Decodificar el token
        const decoded = jwtDecode(tokenJwt);
        const role = decoded.role;

        if (role == "admin") {
          setIsAdmin(true);
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
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
