import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "react-simple-wysiwyg";
import { Label, Select } from "flowbite-react";
import useUpdate from "../../../hooks/Products/useUpdate";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UpdProd({
  modal,
  trigger,
  setTrigger,
  setOpenModalUpd,
  id,
}) {
  const { handleUpdate, error } = useUpdate();
  const modalPlacement = "center";
  const [idProd, setIdProd] = useState("");
  const [data, setData] = useState(null); // Inicializar como null
  const [nombreProd, setNombreProd] = useState("")
  const [descProd, setDescProd] = useState("")
  const [marca, setMarca] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [stock, setStock] = useState("")
  const [precioProd, setPrecioProd] = useState("")
  const [precioProdOff, setPrecioProdOff] = useState("")
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hasSubcategories, setHasSubcategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [errorMostrar, setErrorMostrar] = useState("")
 

  function onChange(e) {
    setDescProd(e.target.value);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/producto/${id}`);
        const product = response.data;
        setData(product); // Guardar el producto directamente
        setIdProd(product.id_prod)
        setNombreProd(product.nombre_prod)
        setDescProd(product.desc_prod)
        setSelectedMarca(product.id_marca)
        setStock(product.stock_prod)
        setPrecioProd(product.precio_prod)
        setPrecioProdOff(product.precio_off_prod)
        setSelectedCategory(product.id_cat)
        setSelectedSubcategory(product.id_subCat)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/marcas`);

        const mappedData = response.data.map((item) => ({
          id: item.id_marca,
          name: item.nombre_marca,
        }));
        setMarca(mappedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [modal, trigger]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categoria`);
        const mappedData = response.data.map((item) => ({
          id: item.id_cat,
          name: item.nombre_cat,
        }));
        setCategories(mappedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setErrorMostrar("")
      const fetchData = async () => {
        try {
          const response = await axios.post(`${apiUrl}/subCategoria`, {
            selectedCategory,
          });
          const mappedData = response.data.map((item) => ({
            id: item.id_subCat,
            name: item.nombre_subCat,
          }));
          setSubcategories(mappedData);
          setHasSubcategories(mappedData.length > 0);

          if (mappedData.length === 0) {
            setSelectedSubcategory("0");
          }
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      };
      fetchData();
    } else {
      setSubcategories([]);
      setHasSubcategories(true);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleMarcaChange = (e) => {
    setSelectedMarca(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (selectedSubcategory === "") {
      setErrorMostrar("Debe elegir una SubCategoría");
      return;
  }
  

    handleUpdate(idProd, nombreProd, descProd, selectedMarca, stock, precioProd, precioProdOff, selectedCategory, selectedSubcategory);
    setTrigger(!trigger);
    setOpenModalUpd(false);
  };

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModalUpd(false)}
      size="6xl"
    >
      <Modal.Header>Editar Producto</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            {errorMostrar && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span> {errorMostrar}
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="nombreMarca"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Id Producto
              </label>
              <input
                type="text"
                value={data?.id_prod || ""} // Acceder a la propiedad del producto
                id="idProd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                disabled
              />
            </div>

            {data && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="nombreProd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre Producto
                  </label>
                  <input
                    type="text"
                    value={nombreProd} // Acceder al nombre del producto
                    onChange={(e) => setNombreProd(e.target.value)}
                    id="nombreProd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Logitech"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="descProd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción
                  </label>
                  <Editor
                    containerProps={{ style: { resize: "vertical" } }}
                    value={descProd}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="marca" value="Marca" />
                  </div>
                  <Select
                    id="marca"
                    required
                    value={selectedMarca}
                    onChange={handleMarcaChange}
                  >

                    {marca.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="stockProd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    id="stockProd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="10"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="precioProd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    type="text"
                    value={precioProd}
                    onChange={(e) => setPrecioProd(e.target.value)}
                    id="precioProd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="$99.0000"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="precioProdOff"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio en Oferta
                  </label>
                  <input
                    type="text"
                    value={precioProdOff}
                    onChange={(e) => setPrecioProdOff(e.target.value)}
                    id="precioProdOff"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="$99.0000"
                    required
                  />
                </div>
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="cat" value="Categoría" />
                  </div>
                  <Select
                    id="cat"
                    required
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">---</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="subCat" value="Sub Categoría" />
              </div>
              <Select
                id="subCat"
                required
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
                disabled={!selectedCategory || !hasSubcategories}
              >
                <option value="">
                  {hasSubcategories
                    ? "---"
                    : "No hay subcategorías disponibles"}
                </option>
                {subcategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
                {/* Puedes seguir agregando más campos aquí según los datos que tienes */}
              </>
            )}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Actualizar</Button>
        <Button color="gray" onClick={() => setOpenModalUpd(false)}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
