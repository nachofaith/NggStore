import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Title from "../components/Title";
import useLogin from "../hooks/useLogin";

export default function Login(props) {
  const { error, loading, handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(email, password);

    if (success) {
      navigate("/profile");
    }
  };

  return (
    <div
      className={
        props.full === "off"
          ? "mt-20 flex flex-col mx-auto"
          : "h-screen mt-20 flex flex-col mx-auto"
      }
    >
      <Title text="Iniciar sesión" align="center" />
      <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Iniciando..." : "Iniciar"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span>¿No tienes una cuenta?</span>
        <Link to="/register" className="text-blue-700 hover:underline ml-2">
          Registrar
        </Link>
      </div>
    </div>
  );
}
