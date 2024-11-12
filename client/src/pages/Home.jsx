import Hero from "../components/Hero.jsx";
import Categories from "../components/Categories.jsx";
import Section from "../components/Section.jsx";
import useRead from "../hooks/useRead.jsx";
import useProducts from "../hooks/useProducts.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import React from "react";

export default function Home() {
  const navigate = useNavigate();
  const { fetchProducts, products, setLoading, loading, error } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []); // Ejecuta fetchProducts solo una vez al montar el componente

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]); // Solo navega a 404 si hay un error

  useEffect(() => {
    if (products !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [products, setLoading]); // Configura el loading solo cuando los productos están cargados

  return (
    <div>
      {loading ? (
        <div className="h-screen pt-20 container mx-auto ">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-10">
          <Hero />
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <Categories />
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <Section
            data={products}
            text="Recién llegados"
            tipo="news"
            limit={4}
          />
          <Section
            data={products}
            text="Últimas ofertas"
            tipo="off"
            limit={4}
          />
        </div>
      )}
    </div>
  );
}
