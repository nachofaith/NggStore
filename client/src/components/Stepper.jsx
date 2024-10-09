export default function Stepper({ step, handleStepClick }) {
  return (
    <div
      id="stepper"
      className="flex justify-center items-center border rounded-md py-4 px-2 mx-2"
    >
      <ol className="items-center space-y-4 md:space-x-52 sm:flex sm:space-x-30 sm:space-y-0 rtl:space-x-reverse">
        <li
          className={
            step === 1
              ? `flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse`
              : `flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse`
          }
          onClick={
            step === 2 || step === 3 ? () => handleStepClick(1) : undefined
          }
        >
          <span
            className={
              step === 1
                ? `flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500`
                : `flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400`
            }
          >
            1
          </span>
          <span>
            <h3 className="font-medium leading-tight">
              Información del Cliente
            </h3>
            <p className="text-sm">Dirección y datos</p>
          </span>
        </li>

        <li
          className={
            step === 2
              ? `flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse`
              : `flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse`
          }
          onClick={step === 3 ? () => handleStepClick(2) : undefined}
        >
          <span
            className={
              step === 2
                ? `flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500`
                : `flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400`
            }
          >
            {" "}
            2
          </span>
          <span>
            <h3 className="font-medium leading-tight">Opciones de entrega</h3>
            <p className="text-sm">Envío o Retiro</p>
          </span>
        </li>

        <li
          className={
            step === 3
              ? `flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse`
              : `flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse`
          }
        >
          <span
            className={
              step === 3
                ? `flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500`
                : `flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400`
            }
          >
            {" "}
            3
          </span>
          <span>
            <h3 className="font-medium leading-tight">Pagar</h3>
            <p className="text-sm">Opciones de Pago</p>
          </span>
        </li>
      </ol>
    </div>
  );
}
