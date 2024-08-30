import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button, Table } from "flowbite-react";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "WEBP"];

export default function DragDrop({ onChange }) {
  const [files, setFiles] = useState([]);
  const [coverImageIndex, setCoverImageIndex] = useState(null);

  // const handleChange = (newFiles) => {
  //   const updatedFiles = [...files, ...Array.from(newFiles)];
  //   setFiles(updatedFiles);
  //   if (onChange) {
  //     onChange(updatedFiles);
  //   }
  // };


  const handleChange = (newFiles) => {
    const updatedFiles = [...files, ...Array.from(newFiles)];
    setFiles(updatedFiles);
    if (onChange) {
      onChange(updatedFiles.map((file, index) => ({
        file,
        isFront: index === coverImageIndex, // Indica si el archivo es la portada
      })));
    }
  };

  const handleRemove = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    if (indexToRemove === coverImageIndex) {
      setCoverImageIndex(null); // Reset coverImageIndex if the removed file was the cover
    } else if (indexToRemove < coverImageIndex && coverImageIndex !== null) {
      setCoverImageIndex((prevIndex) => prevIndex - 1); // Adjust coverImageIndex if necessary
    }
  };

  // const handleSetCover = (index) => {
  //   setCoverImageIndex(index);
  //   console.log("Cover image index set to:", index);
  // };


  const handleSetCover = (index) => {
    setCoverImageIndex(index);
    console.log("Cover image index set to:", index);
  
    // Actualizar la información de archivos al cambiar la portada
    if (onChange) {
      onChange(files.map((file, i) => ({
        file,
        isFront: i === index,
      })));
    }
  };
  
  const moveUp = (index) => {
    if (index === 0) return; // Already at the top
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index - 1],
    ];
    setFiles(newFiles);

    // Adjust coverImageIndex if necessary
    if (coverImageIndex === index) {
      setCoverImageIndex(index - 1);
    } else if (coverImageIndex === index - 1) {
      setCoverImageIndex(index);
    }
  };

  const moveDown = (index) => {
    if (index === files.length - 1) return; // Already at the bottom
    const newFiles = [...files];
    [newFiles[index + 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index + 1],
    ];
    setFiles(newFiles);

    // Adjust coverImageIndex if necessary
    if (coverImageIndex === index) {
      setCoverImageIndex(index + 1);
    } else if (coverImageIndex === index + 1) {
      setCoverImageIndex(index);
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
    <section>
      <FileUploader
        handleChange={handleChange}
        id="multiple-file-upload"
        name="files"
        types={fileTypes}
        multiple={true}
      />
      <div className="pt-4">
        {files.length > 0 ? (
          <Table className="text-center">
            <Table.Head>
              <Table.HeadCell>Preview</Table.HeadCell>
              <Table.HeadCell>Nombre Imagen</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
              <Table.HeadCell>Portada</Table.HeadCell>
              <Table.HeadCell>Orden</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {files.map((file, index) => (
                <Table.Row key={index} className="bg-white">
                  <Table.Cell>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-20 w-20 object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {truncateFileName(file.name)}
                  </Table.Cell>
                  <Table.Cell>
                    <a href="#" onClick={() => handleRemove(index)}>
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
                      onClick={() => handleSetCover(index)}
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
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        size="sm"
                        color="gray"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 15 7-7 7 7"
                          />
                        </svg>
                      </Button>
                      <Button
                        onClick={() => moveDown(index)}
                        disabled={index === files.length - 1}
                        size="sm"
                        color="gray"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 9-7 7-7-7"
                          />
                        </svg>
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>No files uploaded yet</p>
        )}
      </div>
    </section>
  );
}
