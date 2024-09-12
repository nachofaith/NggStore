import Hero from "../components/Hero.jsx";
import Categories from "../components/Categories.jsx";
import Section from "../components/Section.jsx";
import useRead from "../hooks/useRead.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react"; // Asegúrate de importar el Spinner si lo estás usando


export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { data, readProducts, error } = useRead();
  readProducts();

  useEffect(() => {
    if (error) {
      navigate("/404"); // Redirige a 404 si hay un error
    } else if (data !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [error, data, navigate]);

  return (
    <div>
      
      {loading ? (
        <div className="h-screen pt-20 container mx-auto ">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <div>
          <Hero />
          <Categories />
          <Section data={data} text="Recién llegados" tipo="news" limit={4} />
          <Section data={data} text="Ultimas ofertas" tipo="off" limit={4} />
        </div>
      )}
    </div>
  );
}
