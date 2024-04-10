import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "/src/assets/custom.css";
import Badge from "react-bootstrap/Badge";


function JumboTron() {
  return (
    <>
      <Container className="">
        <Container>
          <Row className="px-4 pt-2 my-5 text-center ">
            <h5>
              <Badge bg="secondary">Destacados</Badge>
            </h5>

            <h1 className="display-5 fw-bold text-body-emphasis text-uppercase">
              LOGITECH K/DA de league of legends
            </h1>

            <Col className="col-lg-6 mx-auto">
              <p className="lead mb-4">
                Penetra en Summoner’s Rift con un teclado apto para torneos,
                dotado de interruptores GX Brown táctiles. No importa con qué
                campeona de K/DA juegues, desde Ahri a Seraphine, siempre
                tendrás las pulsaciones de teclado precisas que necesites para
                recorrer todo el camino hasta Nexus.
              </p>
              <div className="justify-content-sm-center ">
                <Button className="" variant="primary">
                  Lo quiero!
                </Button>
              </div>
            </Col>
          </Row>
          <Row
            className="text-center px-5 overflow-hidden"
            style={{ maxHeight: "30vh" }}
          >
            <Col className="border-bottom">
              {" "}
              <img
                src="/public/img/slider1.jpg"
                className="img-fluid border rounded-3 mb-4"
                alt="Example image"
                width="700"
                height="500"
                loading="lazy"
              />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col className="md-6">
              <div className="h-100 p-5 text-bg-dark p-3 rounded-3">
              <h5>
              <Badge bg="secondary">Destacados</Badge>
            </h5>
                <h2 className="text-uppercase">Mouse y Teclados</h2>
                <p>
                  Swap the background-color utility and add a `.text-*` color
                  utility to mix up the jumbotron look. Then, mix and match with
                  additional component themes and more.
                </p>
                <Button className="" variant="primary">
                  Comprar ahora
                </Button>
              </div>
            </Col>
            <Col className="md-6">
              <div className="h-100 p-5 text-bg-dark p-3 rounded-3">
              <h5>
              <Badge bg="secondary">Destacados</Badge>
            </h5>
                <h2 className="text-uppercase">AUDIFONOS GAMER</h2>
                <p>
                Escucha a tus rivales antes que ellos a ti y ¡elimínalos! con la gran variedad de audífonos gamer que tenemos para ti.
                </p>
                <Button className="" variant="primary">
                  Comprar ahora
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <br />
      </Container>
    </>
  );
}

export default JumboTron;
