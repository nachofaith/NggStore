import useRead from "../hooks/useRead";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { Card, Button } from "flowbite-react";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const { data, readCategories } = useRead();
  readCategories();

  useEffect(() => {
    if (data !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="h-screen pt-20 container mx-auto">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto h-screen bg-re">
          <h1 className="py-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl ">
            Categorías
            </span>
          
          </h1>

          <section class="py-8 antialiased md:py-16">
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.map((item) => {
                return (
                  <a
                    href={`/category/${item.id_cat}`}
                    class="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <svg
                      class="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
                      ></path>
                    </svg>
                    <span class="text-lg font-medium text-gray-900 dark:text-white">
                      {item.nombre_cat}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
