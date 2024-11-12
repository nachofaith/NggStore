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
import useProducts from "../hooks/useProducts";
const API_URL = import.meta.env.VITE_APIV2_URL;

export default function SingleProduct() {
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [precioProdOff, setPrecioProdOff] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [coverProd, setCoverProd] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const { idProd } = useParams();

  const { productById, fetchSingleProduct, error, loading, setLoading } =
    useProducts();

  useEffect(() => {
    if (idProd) {
      fetchSingleProduct(idProd);
    }
  }, [idProd]);

  useEffect(() => {
    if (productById && productById.length > 0) {
      setNombreProd(productById[0].name);
      setPrecioProd(productById[0].price);
      setPrecioProdOff(productById[0].priceOff);
      setStockProd(productById[0].stock);
      // Establecer el 'cover' del primer producto
      setCoverProd(productById[0].cover?.url);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [productById]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddClick = (e) => {
    e.preventDefault();

    if (isProductInCart) {
      setIsOpen(true);
    } else {
      addToCart({
        id: productById[0].id, // Usar el idProd convertido a número
        nombreProd,
        precioProd,
        precioProdOff,
        frontImage: coverProd,
        stockProd,
      });
    }

    setIsOpen(true); // Abrir el Drawer
  };








  const handleClick = (item) => {
    setCoverProd(item);
  };

  const isProductInCart =
    Array.isArray(cart.items) &&
    cart.items.some((item) => item.id === Number(idProd));

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
      {loading ? (
        <div className="h-screen pt-20 container mx-auto">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <div className="min-h-screen container mx-auto px-10">
          {/* <Breadcrumb data={data} type="singleProduct" /> */}
          {error && <p className="">{error}</p>}
          <div className="columns-2 gap-8 flex flex-row pt-20">
            <div
              id="imagenes"
              className="w-1/2 h-full flex flex-row gap-4 columns-2"
            >
              <div id="thumbs" className="flex flex-col">
                {productById.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    {item.images?.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`${API_URL}/${image.url}`}
                        alt={`Image ${imgIndex + 1}`}
                        className={
                          coverProd == item
                            ? "w-20 h-20 object-contain opacity-100 rounded-lg shadow"
                            : "w-20 h-20 object-contain opacity-30 hover:opacity-100 rounded-lg shadow-lg"
                        }
                        onClick={() => handleClick(image.url)}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {productById.map((item, index) => (
                <div id="front" key={index} className="flex mx-auto">
                  <img
                    src={
                      `${API_URL}/${coverProd}` ||
                      `${API_URL}/${item.cover?.url}`
                    }
                    alt="Cover Image"
                    className="h-96 w-96 object-contain "
                  />
                </div>
              ))}
            </div>

            <div id="info" className="w-1/2">
              {productById &&
                productById.map((item) => (
                  <div className="">
                    <span className="text-lg uppercase">
                      {item.brand?.name}
                    </span>

                    <h1 className="uppercase font-anton text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl">
                      {item.name}
                    </h1>

                    <p className="pt-10 text-xl">{item.desc}</p>

                    {item.priceOff == 0 ? (
                      <div id="precios" className="text-lg pt-4">
                        <div className="font-normal flex flex-row gap-2 items-center">
                          <span className="">Efectivo o Transferencia:</span>
                          <span className="text-2xl font-semibold text-gray-800">
                            {" "}
                            <FormatCLP precio={item.price} />
                          </span>
                        </div>

                        <div className="font-normal flex flex-row gap-2 items-center">
                          <span>Tarjetas:</span>
                          <span className="text-2xl font-semibold text-gray-800">
                            {" "}
                            <FormatCLP precio={item.price} />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div id="precios" className="text-xl pt-4">
                        <div className="font-normal flex flex-row gap-2 items-center">
                          <span className="">Efectivo o Transferencia:</span>
                          <span className="font-normal text-gray-400 line-through">
                            <FormatCLP precio={item.price} />
                          </span>
                          <span className="text-2xl font-semibold text-gray-800">
                            {" "}
                            <FormatCLP precio={item.priceOff} />
                          </span>
                        </div>

                        <div className="font-normal flex flex-row gap-2 items-center">
                          <span>Tarjetas:</span>
                          <span className="font-normal text-gray-400 line-through">
                            <FormatCLP precio={item.price} />
                          </span>
                          <span className="text-2xl font-semibold text-gray-800">
                            {" "}
                            <FormatCLP precio={item.priceOff} />
                          </span>
                        </div>
                      </div>
                    )}

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
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
