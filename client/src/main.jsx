import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MenuPrincipal from './components/Navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuPrincipal />
    <App />
  </React.StrictMode>,
)
