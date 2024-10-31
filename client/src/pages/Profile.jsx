import { useState, useEffect } from "react";
import MenuProfile from "../components/MenuProfile";
import Address from "../components/Address";
import Info from "../components/Info";
import { useAuth } from "../context/AuthContext"; // Para manejar el logout

export default function Profile() {
  const [selectedMenu, setSelectedMenu] = useState("info");
  const { logout } = useAuth(); // Para manejar el logout

  useEffect(() => {
    if (selectedMenu === "logout") {
      logout();
    }
  }, [selectedMenu, logout]);

  const renderComponent = () => {
    switch (selectedMenu) {
      case "info":
        return <Info />;
      case "address":
        return <Address />;
      case "logout":
        return null; // Retorna null cuando selecciona logout, ya que se maneja en useEffect
      default:
        return <Info />;
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="md:container md:mx-auto flex flex-row gap-4">
        <MenuProfile onMenuSelect={setSelectedMenu} />
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
}
