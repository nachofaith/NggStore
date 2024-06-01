import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Producto from "./Producto";
import Badge from "react-bootstrap/Badge";

function MostrarProdNuevos() {
  return (
    <>
      <br />
      <Container>
        <br />
        <Row>
          <Col>
            <h1>
              Productos recién llegados{" "}
              <Badge bg="warning" text="dark">
                Novedades
              </Badge>
            </h1>
          </Col>
        </Row>
        <br />
        <Row className="grid gap-3">
          <Producto text="nuevo" />
        </Row>
      </Container>
    </>
  );
}

export default MostrarProdNuevos;
