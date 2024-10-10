import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import FormatCLP from "../components/FormateadorCLP";
import useRead from "../hooks/useRead";
import { Spinner } from "flowbite-react";
import { useCart } from "../hooks/useCart";
import { BsCartPlus } from "react-icons/bs";
import CartDrawer from "../components/Drawer";
import { BsFillCartCheckFill } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function SingleProduct() {
  const [loading, setLoading] = useState(true);
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [precioProdOff, setPrecioProdOff] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const { idProd } = useParams();
  const { data, cover, imageUrls, error, handleClick, readSingleProduct } =
    useRead();
  readSingleProduct(idProd);

  useEffect(() => {
    if (data !== null) {
      setNombreProd(data.nombre_prod);
      setPrecioProd(data.precio_prod);
      setPrecioProdOff(data.precio_off_prod);
      setStockProd(data.stock_prod);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddClick = (e) => {
    e.preventDefault();

    const id = Number(idProd); // Convertir idProd a número
    const frontImage = cover;
    if (isProductInCart) {
      setIsOpen(true);
    } else {
      addToCart({
        id, // Usar el idProd convertido a número
        nombreProd,
        precioProd,
        precioProdOff,
        frontImage,
        stockProd,
      });
    }

    setIsOpen(true); // Abrir el Drawer
  };

  const isProductInCart =
    Array.isArray(cart.items) && cart.items.some((item) => item.id === Number(idProd));

  const handleComprar = (e) => {
    e.preventDefault();
    if (isProductInCart) {
      navigate("/cart");
    } else {
      const id = Number(idProd); // Convertir idProd a número
      const frontImage = cover;
      addToCart({
        id, // Usar el idProd convertido a número
        nombreProd,
        precioProd,
        precioProdOff,
        frontImage,
        stockProd,
      });
      window.location.href = "/cart";
    }
  };

  return (
    <>
      <CartDrawer open={isOpen} setIsOpen={setIsOpen} />
      <CartDrawer />
      {loading ? (
        <div className="h-screen pt-20 container mx-auto">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <div className="min-h-screen container mx-auto px-10">
          <Breadcrumb data={data} type="singleProduct" />
          {error && <p className="">{error}</p>}
          <div className="columns-2 gap-8 flex flex-row pt-20">
            <div
              id="imagenes"
              className="w-1/2 h-full flex flex-row gap-4 columns-2"
            >
              <div id="thumbs" className="flex flex-col gap-4 mt-4 w-auto ">
                {imageUrls.map((item, index) => (
                  <img
                    key={index}
                    src={`${apiUrl}/uploads/${item}`}
                    alt={`Image ${index + 2}`}
                    className={
                      cover == item
                        ? "w-20 h-20 object-cover opacity-100 rounded-lg shadow"
                        : "w-20 h-20 object-cover opacity-30 hover:opacity-100 rounded-lg shadow-lg"
                    }
                    onClick={() => handleClick(item)}
                  />
                ))}
              </div>
              {imageUrls.length > 0 && (
                <div id="front" className="flex mb-4 w-2/3 ml-10">
                  <img
                    src={`${apiUrl}/uploads/${cover}`}
                    alt="Image 1"
                    className="w-full h-96 object-contain "
                  />
                </div>
              )}
            </div>

            <div id="info" className="w-1/2">
              {data && (
                <div className="">
                  <span className="text-lg uppercase">{data.nombre_marca}</span>

                  <h1 className="uppercase font-anton text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl">
                    {data.nombre_prod}
                  </h1>
                  <p
                    className="pt-10 text-xl"
                    dangerouslySetInnerHTML={{ __html: data.desc_prod }}
                  />
                  {data.precio_off_prod == 0 ? (
                    <div id="precios" className="text-lg pt-4">
                      <div className="font-normal flex flex-row gap-2 items-center">
                        <span className="">Efectivo o Transferencia:</span>
                        <span className="text-2xl font-semibold text-gray-800">
                          {" "}
                          <FormatCLP precio={data.precio_prod} />
                        </span>
                      </div>

                      <div className="font-normal flex flex-row gap-2 items-center">
                        <span>Tarjetas:</span>
                        <span className="text-2xl font-semibold text-gray-800">
                          {" "}
                          <FormatCLP precio={data.precio_prod} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div id="precios" className="text-xl pt-4">
                      <div className="font-normal flex flex-row gap-2 items-center">
                        <span className="">Efectivo o Transferencia:</span>
                        <span className="font-normal text-gray-400 line-through">
                          <FormatCLP precio={data.precio_prod} />
                        </span>
                        <span className="text-2xl font-semibold text-gray-800">
                          {" "}
                          <FormatCLP precio={data.precio_off_prod} />
                        </span>
                      </div>

                      <div className="font-normal flex flex-row gap-2 items-center">
                        <span>Tarjetas:</span>
                        <span className="font-normal text-gray-400 line-through">
                          <FormatCLP precio={data.precio_prod} />
                        </span>
                        <span className="text-2xl font-semibold text-gray-800">
                          {" "}
                          <FormatCLP precio={data.precio_off_prod} />
                        </span>
                      </div>
                      <div className="py-4">
                        <button
                          type="button"
                          className="text-white bg-blue-500 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center "
                          onClick={handleComprar}
                        >
                          Comprar ahora
                          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className={
                            isProductInCart
                              ? `text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`
                              : `text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center`
                          }
                          onClick={handleAddClick}
                        >
                          {isProductInCart ? (
                            <div className="flex flex-row gap-2">
                              <span>Ver carro</span>
                              <BsFillCartCheckFill className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2">
                              <span>Agregar al carro </span>
                              <BsCartPlus className="h-5 w-5" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
