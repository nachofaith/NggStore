import { useEffect, useState } from "react";
import { Products } from "./Card";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Section(props) {
  const text = props.texto;
  const tipo = props.tipo;
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/products`);
  //       const mappedData = response.data.map((item) => {
  //         // Encuentra la URL de la imagen frontal
  //         const frontImage = item.images.find(image => image.front === 1);
  //         return {
  //           id: item.id_prod,
  //           name: item.nombre_prod,
  //           price: item.precio_prod,
  //           priceOff: item.precio_off_prod,
  //           frontImageUrl: frontImage ? frontImage.url_img : null, // URL de la imagen frontal
  //         };
  //       });
  //       setProducts(mappedData);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        const mappedData = response.data
          .slice(0, 4) // Limita a los primeros 4 resultados
          .map((item) => {
            // Encuentra la URL de la imagen frontal
            const frontImage = item.images.find(image => image.front === 1);
            return {
              id: item.id_prod,
              name: item.nombre_prod,
              price: item.precio_prod,
              priceOff: item.precio_off_prod,
              frontImageUrl: frontImage ? frontImage.url_img : null, // URL de la imagen frontal
            };
          });
        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl py-8 text-center">
        {text}
      </h1>

      <div className="inline-grid grid-cols-4 gap-4">
        {products.map((item) => (
          <Products
            key={item.id}
            id={item.id}
            tipo={tipo}
            nombreProd={item.name}
            precioProd={item.price} 
            precioProdOff={item.priceOff}
            frontImage={item.frontImageUrl}
          />
        ))}
{/* 
        <Products tipo={tipo} />
        <Products tipo={tipo} />
        <Products tipo={tipo} /> */}
      </div>
    </div>
  );
}
