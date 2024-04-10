import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Producto() {
  return (
    <Card style={{ width: "18rem" }}>
      <Row className="justify-content-md-center text-uppercase fs-5">
        <Col md="auto">


          <Badge pill bg="danger">
            Oferta
          </Badge>{" "}
          <Badge pill bg="success">
            Nuevo
          </Badge>

          
        </Col>
      </Row>

      <Card.Img
        variant="top"
        src="https://i0.wp.com/tienda.ngg.cl/wp-content/uploads/2023/12/FRONT.png?fit=600%2C600&ssl=1"
      />
      <Card.Body>
        <Card.Title className="text-uppercase fs-4 fw-light text-center">
          Audifonos Astro A50
        </Card.Title>

        <ListGroup className="list-group-flush border-bottom text-center">
          <ListGroup.Item>
            <h4 className="fw-bold text-center">
              <del className="fw-light fs-5">$54.990</del> $18.000
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge className="text-center text-uppercase" bg="secondary">
              audifonos
            </Badge>{" "}
            <Badge className="text-center text-uppercase" bg="dark">
              hyperx
            </Badge>
          </ListGroup.Item>
        </ListGroup>

        <Card.Text></Card.Text>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Comprar ahora
          </Button>
          <Button variant="primary" size="lg">
            Agregar al carro
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Producto;
