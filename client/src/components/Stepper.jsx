export default function Stepper({ step, handleStepClick }) {
  const steps = [
    {
      id: 1,
      title: "Información del Cliente",
      description: "Dirección y datos",
      clickable: step >= 2,
    },
    {
      id: 2,
      title: "Opciones de entrega",
      description: "Envío o Retiro",
      clickable: step >= 3,
    },
    {
      id: 3,
      title: "Pagar",
      description: "Opciones de Pago",
      clickable: step >= 4,
    },
    {
      id: 4,
      title: "Confirmar Pedido",
      description: "Resumen final",
      clickable: false, // Último paso, no es clickeable
    },
  ];

  const getStepClasses = (currentStep) => {
    return step === currentStep
      ? "text-blue-600 dark:text-blue-500"
      : "text-gray-500 dark:text-gray-400";
  };

  const getCircleClasses = (currentStep) => {
    return step === currentStep
      ? "flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500"
      : "flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400";
  };

  return (
    <div
      id="stepper"
      className="flex justify-center items-center border rounded-md py-4 px-6 w-full"
    >
      {/* Ajustes responsivos con flex-wrap, max-w-full y un mejor centrado */}
      <ol className="flex flex-wrap justify-center items-center space-y-4 sm:flex-row sm:space-x-30 md:space-x-52 rtl:space-x-reverse w-full max-w-full">
        {steps.map(({ id, title, description, clickable }) => (
          <li
            key={id}
            className={`flex flex-col items-center text-center cursor-pointer ${getStepClasses(id)} w-full sm:w-auto`}
            onClick={clickable ? () => handleStepClick(id) : undefined}
          >
            <span className={getCircleClasses(id)}>{id}</span>
            <h3 className="font-medium leading-tight mt-2">{title}</h3>
            <p className="text-sm">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
