import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MostrarOfertas() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Productos en oferta</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title className="text-uppercase">
                  Audifonos Astro A50
                </Card.Title>
                <Card.Text>$18.000</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
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
