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
        <div className="container mx-auto pt-20">
          <div class="grid mb-8 border border-gray-200 shadow-sm  md:mb-12 md:grid-cols-2">
            {data.map((item) => {
              return (
                <a href={`/category/${item.id_cat}`} className="hover:bg-blue-400 hover:text-white hover:">
                  <figure class="flex flex-col items-center justify-center p-8 text-center border-b border-gray-200  rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
                    <blockquote class="max-w-2xl mx-auto mb-4 lg:mb-8">
                      <h1 class="text-4xl">
                        {item.nombre_cat}
                      </h1>
                      <p class="my-4">
                        If you care for your time, I hands down would go with
                        this."
                      </p>
                    </blockquote>
                  </figure>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
