import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { useEffect, useState, React } from "react";
import { useAuth } from "../context/login";

export default function Perfil( props ) {
  const user = props.user
  const email = props.email
  const role = props.role

  const { logout } = useAuth();


  const handleClick = () => {
    logout();
    localStorage.removeItem("token");
    setUser(null);
  };


  console.log(role)
  return (
    <Dropdown label="Dropdown">
      <Dropdown.Header>
        <span className="block text-sm">{user}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
    {
      role === "client" && <Dropdown.Item icon={HiViewGrid}>Perfil</Dropdown.Item>
     
    }
    {
      role === "admin" && <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
    }
  
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleClick} icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}