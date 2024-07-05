import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import Login from "./Login.jsx";
import Page404 from "./components/Page404.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>

    <Footer />
  </React.StrictMode>
);
