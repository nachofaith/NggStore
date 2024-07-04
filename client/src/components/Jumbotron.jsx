import { Button } from "flowbite-react";
export default function Jumbotron() {
  return (

    <div className="pt-10 container mx-auto ">

      {/* Jumbotron Principal */}
      <section className="bg-gray-500 rounded md:container md: mx-auto bg-center bg-no-repeat bg-[url('https://resource.logitechg.com/w_1800,h_1800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-white-update/g915-tkl-feature-07-desktop-w.png?v=1')] bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="tracking-wide mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-6xl">
            Colección Logitech
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
            Tenemos los mejores productos de Logitech a los mejores precios
          </p>
          <a
            href="#"
            className="inline-flex justify-center items-center bg-white text-gray-900 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Saber mas
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
      </section>




      <div className="grid md:grid-cols-2 gap-8 pt-8">


      <section className="bg-gray-500 rounded md:container md: mx-auto bg-center bg-no-repeat bg-[url('https://redragon.es/content/uploads/2021/05/HEROS-3.jpg')] bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="tracking-wide mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-6xl">
            Periféricos
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
            Teclados y mouse para obtener la mayor ventaja contra tus enemigos
          </p>
          <a
            href="#"
            className="inline-flex justify-center items-center bg-white text-gray-900 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Saber mas
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
      </section>


      <section className="bg-gray-500 rounded md:container md: mx-auto bg-center bg-no-repeat bg-[url('https://assets.xboxservices.com/assets/1d/b8/1db8a7b7-7165-4f1f-976f-ea86e9b3c1cc.jpg?n=284993_Page-Hero-1084_1920x720.jpg')] bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="tracking-wide mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-6xl">
            Zona Gamer
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
            Controles, audifonos y accesorios para tu Computadora o Consola
          </p>
          <a
            href="#"
            className="inline-flex justify-center items-center bg-white text-gray-900 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Saber mas
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
      </section>

      </div>

      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
</div>



  );
}
