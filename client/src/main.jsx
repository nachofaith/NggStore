import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPrincipal from './components/Navbar.jsx'
import JumboTron from './components/Jumbotron.jsx'
import MostrarOfertas from './components/Ofertas.jsx';
import PiePagina from './components/Footer.jsx';
import SliderHome from './components/Slider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuPrincipal />
    <SliderHome />
    <MostrarOfertas />
    <PiePagina />
  </React.StrictMode>,
)
