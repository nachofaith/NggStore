import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuthState = Cookies.get("isAuthAdmin");
    setIsAuth(savedAuthState === "true");
    setIsLoading(false);
  }, []);

  const login = async () => {
    setIsAuth(true);
    Cookies.set("isAuthAdmin", "true", {
      expires: 7, // Expira en 7 días
      secure: true, // Solo se envía a través de HTTPS
      sameSite: "Strict", // Previene ataques CSRF
    });
  };


  const logout = async () => {
    setIsAuth(false);
    Cookies.remove("isAuthAdmin");
    try {
      await axios.post("http://localhost:3000/logout"); // Llamada al endpoint de logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
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



// import { createContext, useState, useContext, useEffect } from "react";
// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedAuthState = localStorage.getItem("isAuthAdmin");

//     setIsAuth(savedAuthState === "true");

//     setIsLoading(false);
//   }, []);

//   const login = async () => {
//     setIsAuth(true);
//     localStorage.setItem("isAuthAdmin", "true");
//   };

//   const logout = () => {
//     setIsAuth(false);
//     localStorage.removeItem("isAuthAdmin");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuth,
//         login,
//         logout,
//         isLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
