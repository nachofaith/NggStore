import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MenuPrincipal() {
  return (
    <>
    
 

     <Navbar expand="md" className=''> 
        <Container className='border-bottom'>
          <Navbar.Brand href="#home">
            <img src='https://i0.wp.com/tienda.ngg.cl/wp-content/uploads/2021/11/Sin-titulo-2.png?w=470&ssl=1' width={250}></img>
          </Navbar.Brand>
          <Nav className="me-auto fs-4 fw-light text-body-emphasis text-uppercase">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuPrincipal;