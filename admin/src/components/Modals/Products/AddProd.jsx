import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import useRegister from "../../../hooks/Products/useRegister";
import { Label, Select } from "flowbite-react";
import axios from "axios";
import Editor from "react-simple-wysiwyg";
import DragDrop from "../../DragDrop";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AddProd({ modal, trigger, setTrigger, setOpenModal }) {
  const modalPlacement = "center";
  const { handleRegister, error } = useRegister();
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [precioProdOff, setPrecioProdOff] = useState("0");
  const [stockProd, setStockProd] = useState("");
  const [categories, setCategories] = useState([]);
  const [marca, setMarca] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hasSubcategories, setHasSubcategories] = useState(true);
  const [errorMostrar, setErrorMostrar] = useState(null);
  const [files, setFiles] = useState([]);
  const [descProd, setDescProd] = useState(
    "Descripcion del Producto"
  );

  function onChange(e) {
    setDescProd(e.target.value);
  }

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
  }, [modal, trigger]);

  useEffect(() => {
    if (selectedCategory) {
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

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registerResponse = await handleRegister(
      nombreProd,
      descProd,
      stockProd,
      precioProd,
      precioProdOff,
      selectedMarca,
      selectedCategory,
      selectedSubcategory
    );
  
    const idProd = registerResponse.data.idProd;
  
    const formData = new FormData();
    files.forEach(({ file, isFront }) => {
      formData.append("images", file); // Asegúrate de que "images" coincide con el campo en Multer
      formData.append("frontFiles[]", isFront ? "true" : "false"); // Asegúrate de usar "frontFiles[]"
    });
    formData.append("idProd", idProd);
  
    try {
      await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTrigger(!trigger);
      setOpenModal(false); // Cierra el modal o maneja el éxito
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };

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

  return (
    <Modal
      show={modal}
      position={modalPlacement}
      onClose={() => setOpenModal(false)}
      size="6xl"
    >
      <Modal.Header>Agregar Producto</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span> {error}
              </div>
            )}
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
                htmlFor="nombreProd"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre Producto
              </label>
              <input
                type="text"
                value={nombreProd}
                onChange={(e) => setNombreProd(e.target.value)}
                id="nombreProd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Teclado Gamer Logitech PRO X"
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
                <option value="">---</option>
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
                value={stockProd}
                onChange={(e) => setStockProd(e.target.value)}
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

            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="dragDrop" value="Imagenes" />
              </div>
              <DragDrop onChange={handleFileChange} />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Agregar</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Salir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
