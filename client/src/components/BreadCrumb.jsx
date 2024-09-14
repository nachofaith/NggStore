import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function Migajas({ data, type }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);

  console.log(data);
  const categoryName = data?.[0]?.nombre_cat || "Categoría desconocida";
  return (
    <>
      {loading ? (
        <div className="h-screen pt-20 container mx-auto ">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="bg-gray-50 px-5 py-3 dark:bg-gray-800 rounded-lg uppercase"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/categories">Categorías</Breadcrumb.Item>
          {type === "category" ? (
            <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item href={`/category/${data.id_cat}`}>
              {data.nombre_cat}
            </Breadcrumb.Item>
          )}

          {type !== "category" && (
            <Breadcrumb.Item>{data.nombre_prod}</Breadcrumb.Item>
          )}
        </Breadcrumb>
      )}
    </>
  );
}
