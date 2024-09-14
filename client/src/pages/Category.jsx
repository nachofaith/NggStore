import { useParams, useNavigate } from "react-router-dom";
import useRead from "../hooks/useRead";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react"; // Asegúrate de importar el Spinner si lo estás usando
import Section from "../components/Section";
import Breadcrumb from "../components/BreadCrumb"

export default function Category() {
  const { idCat } = useParams();

  const { prodCat, data, error } = useRead();
  const [loading, setLoading] = useState(true);
  prodCat(idCat)
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/404");  // Redirige a 404 si hay un error
    } else if (data !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  }, [error, data, navigate]);

  const categoryName = data?.[0]?.nombre_cat || "Categoría desconocida";

  return (
    <>
      {loading ? (      
        <div className="h-screen pt-20 container mx-auto ">
        <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
        </div>
      ) : (
        <div className="h-screen pt-20">
          <Breadcrumb data={data} type="category" />
          <Section data={data}  text={`Categoría: ${categoryName}`}/>
        </div>
      )}
    </>
  );
}



{/* 
          <div className="container mx-auto">
            <h1 className="text-center text-2xl">Categoría: </h1>
            {data && data.map((product) => (
              <p key={product.id}>{product.nombre_cat}</p>
            ))}
          </div> */}