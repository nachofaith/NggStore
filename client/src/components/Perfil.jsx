import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { useAuth } from "../context/login.jsx";
import { Link } from "react-router-dom";

export default function Perfil(props) {
  const user = props.user;
  const email = props.email;
  const role = props.role;

  const { logout } = useAuth();

  return (
    <Dropdown color="blue"  label="Mi Cuenta">
      <Dropdown.Header>
        <span className="block text-sm">{user}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      {role === "client" && (
        <Dropdown.Item icon={HiViewGrid}>Perfil</Dropdown.Item>
      )}
      {role === "admin" && (
        <Dropdown.Item icon={HiViewGrid}>
          <Link to="dashboard">Dashboard</Link>
        </Dropdown.Item>
      )}

      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout} icon={HiLogout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
