import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "react-simple-wysiwyg";
import { Label, Select } from "flowbite-react";
import useUpdate from "../../../hooks/Products/useUpdate";
import DragDrop from "../../DragDrop";
import useDelete from "../../../hooks/Products/useDelete";
import Confirm from "../../Confirm.jsx";
import FormatCLP from "../../FormateadorCLP.jsx";

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
  const [data, setData] = useState(null);
  const [nombreProd, setNombreProd] = useState("");
  const [descProd, setDescProd] = useState("");
  const [marca, setMarca] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [stock, setStock] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [precioProdOff, setPrecioProdOff] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hasSubcategories, setHasSubcategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [errorMostrar, setErrorMostrar] = useState("");
  const [imgUp, setImgUp] = useState([]); // Inicializar como array
  const [imgDel, setImgDel] = useState("");
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [coverImageIndex, setCoverImageIndex] = useState(null);
  const [cover, setCover] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { handleDeleteImg, errorDel } = useDelete();

  function HandleOnChange(e) {
    setDescProd(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/producto/${id}`);
        const product = response.data;
        setData(product);
        setIdProd(product.id_prod);
        setNombreProd(product.nombre_prod);
        setDescProd(product.desc_prod);
        setSelectedMarca(product.id_marca);
        setStock(product.stock_prod);
        setPrecioProd(product.precio_prod);
        setPrecioProdOff(product.precio_off_prod);
        setSelectedCategory(product.id_cat);
        setSelectedSubcategory(product.id_subCat);
        setImgUp(product.images);

        // Filtra la imagen de portada
        const coverImage = product.images.findIndex(
          (image) => image.front === 1
        );

        const coverImageObj = product.images.find((image) => image.front === 1);
        const coverImageId = coverImageObj ? coverImageObj.id_img : null;

        setCover(coverImageId);
        setCoverImageIndex(coverImage);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, trigger, modal]);

  useEffect(() => {
    const fetchMarcas = async () => {
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

    fetchMarcas();
  }, [modal, trigger]);

  useEffect(() => {
    const fetchCategorias = async () => {
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

    fetchCategorias();
  }, [selectedCategory]);

  useEffect(() => {
    if (!modal) {
      setSuccess(false);
    }
  }, [modal]);

  useEffect(() => {
    if (selectedCategory) {
      setErrorMostrar("");
      const fetchSubcategorias = async () => {
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
      fetchSubcategorias();
    } else {
      setSubcategories([]);
      setHasSubcategories(true);
    }
  }, [selectedCategory]);

  // const handleFileChange = (newFiles) => {
  //   setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  // };

  const handleFileChange = (newFiles) => {
    const processedFiles = newFiles.map((file) => {
      if (file instanceof File || file instanceof Blob) {
        return URL.createObjectURL(file); // Convertir File/Blob a URL
      } else if (typeof file === "string") {
        return file; // Usar la URL tal como está
      } else if (file.file) {
        return file.file; // Manejar la URL directamente si es un objeto
      }
    });

    setFile(processedFiles); // Guardar archivos procesados en el estado
  };

  const handleConfirm = (e) => {
    e.preventDefault;
    setImgDel(e);
    setConfirm(true);
  };

  const handleRemove = () => {
    handleDeleteImg(imgDel);
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== imgDel));
    if (imgDel === coverImageIndex) {
      setCoverImageIndex(null); // Reset coverImageIndex if the removed file was the cover
    } else if (imgDel < coverImageIndex && coverImageIndex !== null) {
      setCoverImageIndex((prevIndex) => prevIndex - 1); // Adjust coverImageIndex if necessary
    }
    setTrigger(!trigger);
    setConfirm(false);
  };

  const handleSetCover = (file, index) => {
    setCover(file.id_img);
    setCoverImageIndex(index);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSubcategory === "") {
      setErrorMostrar("Debe elegir una SubCategoría");
      return;
    }

    if (file.length > 0) {
      const formData = new FormData();
      console.log(file);
      file.forEach((file, index) => {
        formData.append("images", file);
        formData.append("frontFiles[]", index === 0 ? "true" : "false");
      });
      formData.append("idProd", idProd);

      try {
        await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Resetea la imagen de portada
        setFile([]);
        setTrigger(!trigger); // Activa el trigger para refrescar la vista

        console.log(file, files); // Debe mostrar un array vacío []
      } catch (error) {
        console.error("Error uploading files: ", error);
      }
    }

    handleUpdate(
      idProd,
      nombreProd,
      descProd,
      selectedMarca,
      stock,
      precioProd,
      precioProdOff,
      selectedCategory,
      selectedSubcategory
    );

    try {
      const response = await axios.post(`${apiUrl}/updateImageFront`, {
        cover,
        idProd,
      });

      console.log(response);

      if (response.status === 200) {
        setSuccess(true);
        setTrigger(!trigger);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(
        "Error al actualizar la imagen de portada:",
        error.response?.data || error.message
      );
      // Manejar el error adecuadamente aquí
      setSuccess(false);
    }
  };

  const truncateFileName = (name, maxLength = 15) => {
    if (name.length <= maxLength) return name;
    const extIndex = name.lastIndexOf(".");
    const extension = name.slice(extIndex);
    const truncatedName = name.slice(0, maxLength - extension.length) + "...";
    return truncatedName + extension;
  };

  return (
    <div>
      <Confirm
        modal={confirm}
        onConfirm={handleRemove}
        onCancel={() => setConfirm(false)}
      />
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
              {errorDel && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Error!</span> {errorDel}
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
                  value={data?.id_prod || ""}
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
                      value={nombreProd}
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
                      onChange={HandleOnChange}
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
                      placeholder="200"
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
                      placeholder="45000"
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="precioProdOff"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Precio Oferta
                    </label>
                    <input
                      type="text"
                      value={precioProdOff}
                      onChange={(e) => setPrecioProdOff(e.target.value)}
                      id="precioProdOff"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="45000"
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="category" value="Categoría" />
                    </div>
                    <Select
                      id="category"
                      required
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Seleccione una categoría</option>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {hasSubcategories && (
                    <div className="mb-5">
                      <div className="mb-2 block">
                        <Label htmlFor="subcategory" value="SubCategoría" />
                      </div>
                      <Select
                        id="subcategory"
                        required
                        value={selectedSubcategory}
                        onChange={handleSubcategoryChange}
                      >
                        <option value="">Seleccione una subcategoría</option>
                        {subcategories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}

                  <div className="mb-5">
                    <Label htmlFor="dropzone" value="Imágenes" />
                    <DragDrop
                      key={trigger}
                      onChange={handleFileChange}
                      update={true}
                    />
                  </div>

                  <div className="pt-4">
                    {imgUp.length > 0 ? (
                      <Table className="text-center">
                        <Table.Head>
                          <Table.HeadCell>Preview</Table.HeadCell>
                          <Table.HeadCell>Nombre Imagen</Table.HeadCell>
                          <Table.HeadCell>Acción</Table.HeadCell>
                          <Table.HeadCell>Portada</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {imgUp.map((file, index) => (
                            <Table.Row key={index} className="bg-white">
                              <Table.Cell>
                                <img
                                  src={`${apiUrl}/uploads/${file.url_img}`}
                                  alt=""
                                  className="h-20 w-20 object-cover"
                                />
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {truncateFileName(file.url_img)}
                              </Table.Cell>
                              <Table.Cell>
                                <a
                                  href="#"
                                  onClick={() => handleConfirm(file.id_img)}
                                >
                                  <svg
                                    className="w-6 h-6 text-red-400 hover:text-red-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </a>
                              </Table.Cell>
                              <Table.Cell>
                                <a
                                  href="#"
                                  onClick={() => handleSetCover(file, index)}
                                  className={
                                    coverImageIndex === index
                                      ? "text-green-600 font-bold"
                                      : "text-gray-600"
                                  }
                                >
                                  {coverImageIndex === index
                                    ? "Portada"
                                    : "Seleccionar como portada"}
                                </a>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    ) : (
                      <p>No files uploaded yet</p>
                    )}
                  </div>

                  {success && (
                    <div
                      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                      role="alert"
                    >
                      <span className="font-medium">Informacion! </span> Cambios
                      realizados correctamente
                    </div>
                  )}

                  <Button type="submit" className="w-full mt-5">
                    Guardar Cambios
                  </Button>
                </>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
