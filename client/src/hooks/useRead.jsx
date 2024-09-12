import { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const apiUrl = import.meta.env.VITE_API_URL;

const useRead = () => {
  const [data, setData] = useState(null);
  const [dataCat, setDataCat] = useState(null);
  const [cover, setCover] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);


  const readProducts = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/products`);
         
          const product = response.data;
          setData(product);
         
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      fetchData();
    }, []);

  }

  const readSingleProduct = (id) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/producto/${id}`);
          const product = response.data;
          product.desc_prod = he.decode(product.desc_prod); // Decodifica la descripción
          setData(product);

          const frontImage = product.images.find((image) => image.front === 1);
          const frontImageUrl = frontImage
            ? `${apiUrl}/uploads/${frontImage.url_img}`
            : null;
          setCover(frontImageUrl);

          if (product.images) {
            const urls = product.images.map(
              (image) => `${apiUrl}/uploads/${image.url_img}`
            );
            setImageUrls(urls);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          setError(error);
        }
      };

      if (id) {
        fetchData();
      }
    }, [id]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categoria`);
        const product = response.data;
        setDataCat(product);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      }
    };

    if (!dataCat) {
      fetchData();
    }
  }, []);

  const prodCat = (id) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/category/${id}`);
          const product = response.data;
          setData(product);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setError(error);
        }
      };

      if (id) {
        fetchData();
      }
    }, [id]);
  };

  // Handle click function
  const handleClick = (item) => {
    setCover(item);
    console.log(item);
  };

  return {
    data,
    cover,
    imageUrls,
    error,
    handleClick,
    dataCat,
    prodCat,
    readSingleProduct,
    readProducts,
  };
};

export default useRead;
