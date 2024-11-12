import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";

export default function Migajas({ data, type }) {
  const [loading, setLoading] = useState(true);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const { idCat } = useParams();

  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }

    if (idCat) {
      const isSub = idCat.startsWith("sub_");
      setIsSubCategory(isSub);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="h-screen pt-20 container mx-auto ">
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        </div>
      ) : (
        <section>
          {type === "singleProduct" && (
            <Breadcrumb
              aria-label="Solid background breadcrumb example"
              className="bg-gray-50 px-5 py-3 dark:bg-gray-800 rounded-lg uppercase"
            >
              <Breadcrumb.Item href="/" icon={HiHome}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/categories">Categorías</Breadcrumb.Item>
              {data.id_subCat !== 0 ? (
                <>
                  <Breadcrumb.Item href={`/category/${data.id_cat}`}>
                    {data.nombre_cat}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href={`/category/sub_${data.id_subCat}`}>
                    {data.nombre_subCat}
                  </Breadcrumb.Item>
                </>
              ) : (
                <Breadcrumb.Item href={`/category/${data.id_cat}`}>
                  {data.nombre_cat}
                </Breadcrumb.Item>
              )}
              <Breadcrumb.Item>{data.nombre_prod}</Breadcrumb.Item>
            </Breadcrumb>
          )}

          {type === "category" && (
            <Breadcrumb
              aria-label="Solid background breadcrumb example"
              className="bg-gray-50 px-5 py-3 dark:bg-gray-800 rounded-lg uppercase"
            >
              <Breadcrumb.Item href="/" icon={HiHome}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/categories">Categorías</Breadcrumb.Item>
              {data && <Breadcrumb.Item>{data[0]?.name}</Breadcrumb.Item>}
            </Breadcrumb>
          )}
        </section>
      )}
    </>
  );
}
