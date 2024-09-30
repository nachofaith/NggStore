import useRead from "../hooks/useRead";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Title from "../components/Title";

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
        <div className="container mx-auto h-screen">
          <Title text="Categorías" align="center" />
        
          <section className="py-8 antialiased md:py-16">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.map((item) => {
                return (
                  <a
                    key={item.id_cat}
                    href={`/category/${item.id_cat}`}
                    className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                   
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
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
