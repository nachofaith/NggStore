import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPrincipal from "./components/Navbar";
import Home from "./pages/Home";
import Ofertas from "./pages/Ofertas";
import Login from "./pages/Login";
import PiePagina from "./components/Footer";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
    
    <MenuPrincipal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <PiePagina />
    </Router>
  );
}

export default App;
