import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Button from "react-bootstrap/Button";
import NavItem from "react-bootstrap/esm/NavItem";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



function MenuPrincipal() {

  const apiUrl = "https://api.escuelajs.co/api/v1/categories";
  const navigate = useNavigate();
  const [cat, setCat] = useState([]);
  const [user, setUser] = useState(null);
    // Obtiene el token JWT del localStorage
    const token = localStorage.getItem('token');
  

  useEffect(() => {


    if (token) {
      // Decodifica el token JWT
      const decoded = jwtDecode(token);
      // Asigna la información del usuario decodificada al estado
      setUser(decoded);
    }
  }, [token]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };




  useEffect(() => {
    // Función para obtener los productos del archivo JSON usando Axios
    const fetchCat = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCat(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCat();
  }, []);

  return (
    <>
      <Navbar expand="md" className="">
        <Container className="border-bottom">
          <Navbar.Brand href="#home">
            <img
              src="https://i0.wp.com/tienda.ngg.cl/wp-content/uploads/2021/11/Sin-titulo-2.png?w=470&ssl=1"
              width={250}
            ></img>
          </Navbar.Brand>
          <Nav className="me-auto fs-4 fw-light text-body-emphasis text-uppercase">
            <Nav.Link href="#">
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  CATEGORIAS
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {cat.map((response) => (
                    <Dropdown.Item href="#" key={response.id}>
                      {response.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>

            <NavItem>
              <Nav.Link href="/">Home</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="/ofertas">Ofertas</Nav.Link>
            </NavItem>
          </Nav>
          <Navbar.Collapse className="justify-content-end">


          {user ? (
  
          <Navbar.Text>
            Signed in as: <a href="#login">{user.username}</a>
            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </Navbar.Text>
    
      ) : (
        <NavItem><Button href="/login">Login</Button></NavItem>
      )}





      
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}







export default MenuPrincipal;
