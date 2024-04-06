import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Producto from "./Producto";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MostrarOfertas() {
  return (
    <>
      <Container>
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
            <Producto />
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
