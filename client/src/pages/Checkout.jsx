import Title from "../components/Title";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  return (
    <section className="h-auto md:container md:mx-auto sm:px-20 min-h-screen">
      <Title text="Checkout" align="center" />
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
    </section>
  );
}
