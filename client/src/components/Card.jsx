"use client";

import { Card, Badge } from "flowbite-react";
import { Button } from "flowbite-react";

export function Products(props) {
  const tipo = props.tipo;

  return (
    //     <Card
    //       className="max-w-sm pt-4 bg-gradient-to-r from-gray-100 to-gray-300 border-transparent"
    //       imgAlt="Meaningful alt text for an image that is not purely decorative"
    //       imgSrc="/src/assets/a50.png"
    //     >
    //       <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         Audífonos Astro A50
    //       </h5>
    //       {tipo === "news" && (
    //         <div>
    // <span class="bg-green-600 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
    //           Nuevo
    //         </span>
    //         </div>

    //       )}
    //       {tipo === "off" && (
    //         <div>
    // <span class="bg-red-700 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
    //           Oferta
    //         </span>
    //         </div>

    //       )}
    //       <p className="font-normal text-2xl text-gray-700">
    //         $149.990
    //       </p>

    //       <Button color="blue">Comprar</Button>
    //     </Card>

    <div class="text-center max-w-sm border  rounded-lg shadow pt-2">
      {tipo === "news" && (
        <div>
          <span class="bg-green-600 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            Nuevo
          </span>
        </div>
      )}
      {tipo === "off" && (
        <div>
          <span class="bg-red-700 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Oferta
          </span>
        </div>
      )}
      <a href="#">
        <img className="rounded-t-lg" src="/src/assets/a50.png" alt="" />
      </a>
      <div class="p-5 flex flex-col">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
          Audífonos Astro A50
        </h5>

        <div class="flex items-center space-x-1 rtl:space-x-reverse mx-auto">
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            class="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <div className="flex flex-row mx-auto py-4">
        <span class="text-lg font-normal text-gray-400 line-through dark:text-white">
          $14.990
        </span>
        <span class="ms-3 text-xl font-semibold text-gray-800 dark:text-white">
          $9.990
        </span>

        </div>
      

        <div>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
