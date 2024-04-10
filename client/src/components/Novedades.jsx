import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Producto from "./Producto";
import Badge from "react-bootstrap/Badge";

function MostrarProdNuevos() {
  return (
    <>
 
    <br />
      <Container className="border-top">
        <br />
        <Row>
          <Col>
            <h1>
            Productos recién llegados  {" "}
              <Badge bg="warning" text="dark">
                Novedades
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

export default MostrarProdNuevos;
