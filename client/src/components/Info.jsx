import { useAuth } from "../context/AuthContext";


import Title from "./Title";
export default function Info() {
  const { user } = useAuth(); // Obtener la información del usuario del contexto

  return (
    <>
      <Title text="Perfil de Usuario" align="center" />
      {user ? (
        <div>
          <p className="">
            <strong>Nombre:</strong>{" "}
            <span className="capitalize">{user.first_name.toLowerCase() + " " + user.last_name.toLowerCase()}</span>
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Agrega más detalles del perfil según tus datos de usuario */}
        </div>
      ) : (
        <p>No hay información disponible.</p>
      )}
    </>
  );
}
