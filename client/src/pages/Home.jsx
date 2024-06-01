import React from "react";
import JumboTron from "../components/Jumbotron.jsx";
import MostrarOfertas from "../components/Ofertas.jsx";
import MostrarProdNuevos from "../components/Novedades.jsx";
import MenuPrincipal from "../components/Navbar.jsx";

function Home() {
  return (
    <>
    
      <JumboTron />
      <MostrarOfertas />
      <MostrarProdNuevos />
    </>
  );
}

export default Home;
