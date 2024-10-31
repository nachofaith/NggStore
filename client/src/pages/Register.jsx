import { useState, useEffect, useRef } from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorForm, setErrorForm] = useState(null);
  const { handleRegister, error } = useRegister();
  const navigate = useNavigate();
  const isFirstInput = useRef(true);

  // Validación de contraseñas combinada
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = password === "" && password2 === "";
      return;
    }

    if (password.length < 6) {
      setErrorForm("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== password2) {
      setErrorForm("Las contraseñas no coinciden");
      return;
    }

    if (email !== email2) {
      setErrorForm("El email no coincide");
      return;
    }

    setErrorForm(null);
  }, [password, password2, email, email2]);

  // Manejador del submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorForm) {
      return;
    }
    handleRegister(firstName, lastName, email, password).then((success) => {
      if (success) {
        navigate("/"); // Redirige si el registro es exitoso
      }
    });
  };

  const handleChange = (event) => {
    const pass2 = event.target.value;
    setPassword2(pass2);
  };

  return (
    <div className="h-screen mt-20 flex flex-col mx-auto ">
      <Title text="Registro" align="center" />

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Error!</span> {error}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombres
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="jose"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apellidos
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="perez"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="nombre@mail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirmar email
          </label>
          <input
            type="email2"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
            id="email2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="nombre@mail.com"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repite tu contraseña
          </label>
          <input
            type="password"
            value={password2}
            onChange={handleChange}
            id="password2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {errorForm && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Error!</span> {errorForm}
          </div>
        )}

        <div className="flex flex-row gap-4 items-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
