import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";

function MenuPrincipal() {
  const apiUrl = "https://api.escuelajs.co/api/v1/categories";
  const [cat, setCat] = useState([]);

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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Nachin</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuPrincipal;
