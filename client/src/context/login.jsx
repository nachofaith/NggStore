import { createContext, useState, useContext, React, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");

    if (savedAuthState === "true") {
      setIsAuth(true);
      localStorage.setItem("isAuthenticated", "true");
    }
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuthenticated");
   
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
