import { Button, Modal } from "flowbite-react";
import { useState, useEffect, useCallback } from "react";
import useRegister from "../../../hooks/Cat/useRegister";
import { FileInput, Label, Select } from "flowbite-react";
import axios from "axios";
import Editor from "react-simple-wysiwyg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragDrop from "../../DragDrop";

export default function AddProd({ modal, trigger, setTrigger, setOpenModal }) {
  const [html, setHtml] = useState("my <b>HTML</b>");
  function onChange(e) {
    setHtml(e.target.value);
  }

  const modalPlacement = "center";
  const { handleRegister, handleRegisterSub, error } = useRegister();
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [precioProdOff, setPrecioProdOff] = useState("");
  const [idCat, setIdCat] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hasSubcategories, setHasSubcategories] = useState(true);
  const [errorMostrar, setErrorMostrar] = useState(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [inputKey, setInputKey] = useState(0); // Key for input to force re-render

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categoria");
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
          const response = await axios.post(
            "http://localhost:3000/subCategoria",
            { idCat }
          );
          const mappedData = response.data.map((item) => ({
            id: item.id_subCat,
            name: item.nombre_subCat,
          }));
          setSubcategories(mappedData);
          setHasSubcategories(mappedData.length > 0);
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

  const handleFiles = useCallback(
    (newFiles) => {
      const existingFileNames = new Set(
        Array.from(files).map((file) => file.name)
      );
      const filesToAdd = Array.from(newFiles).filter(
        (file) => !existingFileNames.has(file.name)
      );

      if (filesToAdd.length === 0) return;

      setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

      const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    },
    [files]
  );

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleRemoveFile = (indexToRemove, event) => {
    event.stopPropagation();

    const fileToRemove = files[indexToRemove];

    if (!fileToRemove) return;

    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedFiles;
    });

    setPreviews((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedPreviews;
    });

    URL.revokeObjectURL(previews[indexToRemove]);

    // Reset the input only if there are no files left
    if (files.length === 1) {
      setInputKey((prevKey) => prevKey + 1); // Force re-render of input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Imágenes subidas exitosamente");
      } else {
        console.error("Error al subir las imágenes");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setIdCat(e.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(previews);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreviews(items);
    setFiles((prevFiles) => {
      const reorderedFiles = Array.from(prevFiles);
      const [reorderedFile] = reorderedFiles.splice(result.source.index, 1);
      reorderedFiles.splice(result.destination.index, 0, reorderedFile);
      return reorderedFiles;
    });
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
                value={html}
                onChange={onChange}
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
              <DragDrop />
             
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
