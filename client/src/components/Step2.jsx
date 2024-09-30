import Resumen from "../components/Resumen";

export default function Step2({ setCurrentStep }) {
  const handleStep1Click = () => {
    setCurrentStep(1); // Cambia el estado a 1
  };

  const handleClick = () => {
    if (formRef.current && formRef.current.reportValidity() && !error) {
      formRef.current.requestSubmit();
      setCurrentStep(2);
    } else {
      console.log("El formulario contiene errores.");
    }
  };

  return (
    <>
      <div
        id="stepper"
        className="flex justify-center items-center border rounded-md py-4"
      >
        <ol className="items-center space-y-4 md:space-x-52 sm:flex sm:space-x-30 sm:space-y-0 rtl:space-x-reverse">
          <li
            className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse cursor-pointer"
            onClick={handleStep1Click} // Maneja el clic para regresar al Step 1
          >
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">
                Información del Cliente
              </h3>
              <p className="text-sm">Dirección y datos</p>
            </span>
          </li>

          <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              2
            </span>
            <span>
              <h3 className="font-medium leading-tight">Opciones de entrega</h3>
              <p className="text-sm">Envío o Retiro</p>
            </span>
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            <span>
              <h3 className="font-medium leading-tight">Pagar</h3>
              <p className="text-sm">Opciones de</p>
            </span>
          </li>
        </ol>
      </div>
      <div className="flex flex-row pt-10 gap-4 ">
        <div
          id="datos"
          className="md:basis-2/3 sm:flex-col sm:flex p-10 border rounded-md"
        >
          <h1 className="text-xl pb-4 text-center">Opciones de Entrega</h1>
          <ul class="grid w-full gap-6 md:grid-cols-1">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                class="hidden peer"
                required
              />
              <label
                for="hosting-small"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold">Envío a Domicilio</div>
                  <div class="w-full">2 a 3 días Hábiles </div>
                </div>
                $3990
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                class="hidden peer"
              />
              <label
                for="hosting-big"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold">Retiro en Dirección comercial</div>
                  <div class="w-full">Huara #5240, Comuna San Joaquin</div>
                </div>
                Gratis
              </label>
            </li>
          </ul>

         
        </div>
        <Resumen onClick={handleClick} />
      </div>
    </>
  );
}
