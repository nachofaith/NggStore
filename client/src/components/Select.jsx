import React, { useEffect, useState } from "react";
import { chileData } from "../mocks/Chile.js"; // Importa los datos desde el archivo chile.js

const SelectAnidado = ({ formData, setFormData }) => {
  const { region, ciudad, comuna } = formData;

  // Maneja el cambio de región
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setFormData({
      ...formData,
      region: selectedRegion,
      ciudad: "", // Resetea la ciudad cuando se cambia la región
      comuna: "", // Resetea la comuna cuando se cambia la región
    });
  };

  // Maneja el cambio de ciudad
  const handleCiudadChange = (event) => {
    const selectedCiudad = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      ciudad: selectedCiudad,
      comuna: "", // Resetea la comuna cuando se cambia la ciudad
    }));
  };

  // Maneja el cambio de comuna
  const handleComunaChange = (event) => {
    const selectedComuna = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      comuna: selectedComuna,
    }));
  };

  return (
    <div>
      {/* Select para Región */}
      <div className="mb-6">
        <label
          htmlFor="region"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Selecciona una Región
        </label>
        <select
          id="region"
          value={region}
          onChange={handleRegionChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="">-- Seleccionar región --</option>
          {Object.keys(chileData).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Select para Ciudad */}
      {region && (
        <div className="mb-6">
          <label
            htmlFor="ciudad"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Selecciona una ciudad
          </label>
          <select
            id="ciudad"
            value={ciudad}
            onChange={handleCiudadChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">-- Seleccionar ciudad --</option>
            {Object.keys(chileData[region]).map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Select para Comuna */}
      {ciudad && (
        <div className="mb-6">
          <label
            htmlFor="comuna"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Selecciona una comuna
          </label>
          <select
            id="comuna"
            value={comuna}
            onChange={handleComunaChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">-- Seleccionar comuna --</option>
            {chileData[region][ciudad].map((comuna) => (
              <option key={comuna} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SelectAnidado;
