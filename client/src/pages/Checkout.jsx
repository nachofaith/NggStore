import Title from "../components/Title";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const isCartEmpty = cart.items.length === 0;
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isCartEmpty ) {
      navigate("/");
    }
  }, [cart, navigate]);

  return (
    <section className="h-auto md:container md:mx-auto sm:px-20 min-h-screen">
      <Title text="Checkout" align="center" />
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && <Step3 setCurrentStep={setCurrentStep} />}
      {currentStep === 4 && <Step4 setCurrentStep={setCurrentStep} />}
    </section>
  );
}
