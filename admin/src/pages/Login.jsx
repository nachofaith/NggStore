import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import useLogin from "../hooks/useLogin.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div
            id="logo"
            className="flex flex-row items-end gap-2 p-4 justify-center"
          >
            <img className="h-20" src="/src/assets/logo.webp" />
            <h1 className="text-6xl text-gray-400 font-semibold">
              <span className=" text-gray-800">NGG</span>STORE
            </h1>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingreso a panel de Administrador
            </h1>

            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corre@dominio.cl"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Password" />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button color="blue" type="submit">
                Ingresar
              </Button>

              {error && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Error!</span> {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
