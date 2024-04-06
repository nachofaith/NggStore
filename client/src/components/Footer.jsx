import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";


function PiePagina() {
  return (
    <>
      <Container>
        <Navbar className="border-top">
          <Container>
            <Navbar.Brand className="text-secondary" href="#home">
              Ngg Store 2024.
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Desde el 2021 dando lo mejor
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default PiePagina;
