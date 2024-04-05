import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MenuPrincipal() {
  return (
    <>
 

     <Navbar className='fs-4 fw-bold text-body-emphasis'> 
        <Container>
          <Navbar.Brand href="#home">
            <img src='https://i0.wp.com/tienda.ngg.cl/wp-content/uploads/2021/11/Sin-titulo-2.png?w=470&ssl=1' width={250}></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuPrincipal;