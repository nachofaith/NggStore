import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Efectivo from "../components/Efectivo";
import { useCart } from "../hooks/useCart";
import { Spinner } from "flowbite-react";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores
  const { cart, currentStep } = useCart();
  const paymentMethod = cart?.payment;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (cart && paymentMethod) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    if (currentStep !== 4 || !cart) {
      navigate("/checkout");
    }
  }, [cart, paymentMethod, currentStep, navigate]);

  // Función para manejar errores provenientes del hijo
  const handleError = (error) => {
    setError(error);
  };

  return (
    <div>
      {loading ? (
        <div className="text-center h-screen">
          <Spinner
            color="success"
            aria-label="Info spinner example"
            size="xl"
          />
        </div>
      ) : (
        <>
          {error ? (
            <div className="h-screen container flex flex-col mx-auto">
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Error en la compra!</span> {error}
              </div>
            </div>
          ) : (
            paymentMethod?.name === "Efectivo o Transferencia" && (
              <Efectivo onError={handleError} />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Payment;
