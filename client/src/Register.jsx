import { useState, useEffect, useRef } from "react";
import useRegister from './hooks/useRegister'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    // const [role, setRole] = useState("client")
    const role = "client";
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorPass, setErrorPass] = useState(null)
    const { handleRegister, error } = useRegister();
    const navigate = useNavigate();

    const isFirstInput = useRef(true);



    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = password === "";
            return;
        }

        if (password.length < 6) {
            setErrorPass("La password debe tener al menos 6 caracteres");
            return;
        }

        if (password !== password2) {
            return setErrorPass("Las contrasenas no coinciden")
        }

        setErrorPass(null);
    }, [password]);


    useEffect(() => {


        if (isFirstInput.current) {
            isFirstInput.current = password2 === "";
            return;
        }

        if (password.length < 6) {
            setErrorPass("La password debe tener al menos 6 caracteres");
            return;
        }

        if (password !== password2) {
            return setErrorPass("Las contrasenas no coinciden")
        }

        setErrorPass(null);
    }, [password2]);



    const handleSubmit = (e) => {
        e.preventDefault();
        if(errorPass){ return }
        handleRegister(username, email, password, role);
        navigate("/")

    };


    const handleChange = (event) => {
        const pass2 = event.target.value;
        setPassword2(pass2);
    };


    return (
        <div className="h-screen mt-20 flex flex-col mx-auto ">
            <h1 className="pt-20 pb-10 text-center text-4xl">Registro</h1>


            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">Error!</span> {error}
                </div>}

                <div className="mb-5">
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Usuario
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="jose"
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
                        type="email"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        // onChange={(e) => setPassword2(e.target.value)}
                        onChange={handleChange}
                        id="password2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                {errorPass && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">Error!</span> {errorPass}
                </div>}
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
