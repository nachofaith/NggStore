import Stepper from "./Stepper";

export default function Step3({ setCurrentStep }) {
  const handleStepClick = (step) => {
    setCurrentStep(step); // Cambia el estado al paso correspondiente
  };

  return (
    <div>
      <Stepper step={3} handleStepClick={handleStepClick} />
      <div className="grid grid-cols-4 pt-10 gap-1 grid md:grid-cols-4 sm:grid-cols-1 mx-2">
        <div id="datos" className="col-span-4 p-10 border rounded-md">
                <h1>Resumen</h1>


        </div>
      </div>
    </div>
  );
}
