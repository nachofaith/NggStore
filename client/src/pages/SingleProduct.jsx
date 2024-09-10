import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import FormatCLP from "../components/FormateadorCLP";
import useProductData from "../hooks/useRead";
const apiUrl = import.meta.env.VITE_API_URL;

export default function SingleProduct() {
  const { idProd } = useParams();
  const { data, cover, imageUrls, error, handleClick } = useProductData(idProd);

  return (
    <div className="min-h-screen pt-20 container mx-auto ">
      <Breadcrumb cat={data && data.nombre_cat} />
      {error && <p className="">{error}</p>}
      <div className="columns-2 gap-8 flex flex-row">
        <div
          id="imagenes"
          className="w-1/2 h-full flex flex-row gap-4 columns-2"
        >
          <div id="thmubs" className="flex flex-col gap-4 mt-4 w-auto ">
            {imageUrls.map((item, index) => (
              <img
                key={index}
                src={item}
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
                src={cover}
                alt="Image 1"
                className="w-full h-auto object-contain "
              />
            </div>
          )}
        </div>

        <div id="info" className="w-1/2">
          {data && (
            <div className="">
              <span className="text-lg uppercase">{data.nombre_marca}</span>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl">
                {data.nombre_prod}
              </h1>
              <p
                className="pt-10 text-xl"
                dangerouslySetInnerHTML={{ __html: data.desc_prod }}
              />
              <div id="precios" className="text-lg pt-4">
                <div className="font-normal flex flex-row gap-2 items-center">
                  <span className="">Precio Efectivo o Transferencia:</span>
                  <span className="font-normal text-gray-400 line-through">
                    <FormatCLP precio={data.precio_prod} />
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    {" "}
                    <FormatCLP precio={data.precio_off_prod} />
                  </span>
                </div>

                <div className="font-normal flex flex-row gap-2 items-center">
                  <span>Precio Pago con Tarjetas</span>
                  <span className="font-normal text-gray-400 line-through">
                    <FormatCLP precio={data.precio_prod} />
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    {" "}
                    <FormatCLP precio={data.precio_off_prod} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
