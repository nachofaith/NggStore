import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Header } from './components/Header.jsx'
import  Section  from './components/Section.jsx'
import Jumbotron from './components/Jumbotron.jsx'
import Footer from './components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Jumbotron />
    <Section texto="Recién llegados" tipo="news"  />
    <Section texto="Ultimas ofertas" tipo="off"/>
    <Footer />
  </React.StrictMode>,
)
