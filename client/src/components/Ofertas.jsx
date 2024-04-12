import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Producto from "./Producto";
import Badge from "react-bootstrap/Badge";

function MostrarOfertas() {
  return (
    <>
      <br />
      <Container className="border-top">
        <br />
        <Row>
          <Col>
            <h1>
              Productos en oferta{" "}
              <Badge bg="warning" text="dark">
                Descuentos
              </Badge>
            </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Producto text="oferta" />
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default MostrarOfertas;
