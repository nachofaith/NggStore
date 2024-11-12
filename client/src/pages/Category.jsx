import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import Section from "../components/Section";
import Breadcrumb from "../components/BreadCrumb";
import useCat from "../hooks/useCat";
import useProducts from "../hooks/useProducts";
import Title from "../components/Title";

export default function Category() {
  const { idCat } = useParams();
  const {
    singleCat,
    fetchSingleCat,
    setLoading: setLoadCat,
    loading: loadCat,
    error: errorCat,
  } = useCat();

  const {
    fetchProductsByCat,
    productsByCat,
    setLoading: setLoadProd,
    loading: loadProd,
    error: errorProd,
  } = useProducts();

  const navigate = useNavigate();

  useEffect(() => {
    if (idCat) {
      fetchSingleCat(idCat);
      fetchProductsByCat(idCat);
    }
  }, [idCat]);

  useEffect(() => {
    if (errorCat || errorProd) {
      navigate("/404"); // Redirige a 404 si hay un error
    } else if (singleCat !== null && productsByCat !== null) {
      setTimeout(() => {
        setLoadCat(false);
        setLoadProd(false);
      }, 1000);
    }
  }, [errorCat, errorProd, singleCat, productsByCat, navigate]);

  return (
    <>
      {loadProd && loadCat ? (
        <div className="h-screen pt-20 container mx-auto ">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        // <Section
        //   data={productsByCat}
        //   text={singleCat[0]?.name || "Nombre no disponible"}
        //   limit={4}
        // />

        <div className="mx-auto container h-screen">
          <Breadcrumb data={singleCat} type="category" />

          <Section
            data={productsByCat}
            text={singleCat[0]?.name || "Nombre no disponible"}
            tipo="cat"
          />
        </div>
      )}
    </>
  );
}

{
}
