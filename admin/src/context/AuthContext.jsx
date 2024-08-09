import { createContext, useState, useContext, useEffect } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthAdmin");

    setIsAuth(savedAuthState === "true");

    setIsLoading(false);
  }, []);

  const login = async () => {
    setIsAuth(true);
    localStorage.setItem("isAuthAdmin", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuthAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
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
