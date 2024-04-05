import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function JumboTron() {
  return (
    <>
      <Container className="border-bottom">
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
          <Col sm={8} lg={6}>
            <img
              src="/public/img/slider1.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Productos KD/A"
              width="700"
              height="500"
              loading="lazy"
            />
          </Col>
          <Col className="col-lg-6 align-items-center">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center ">
              COLECCION LOGITECH K/DA DE LEAGUE OF LEGENDS®{" "}
            </h1>
            <p class="lead text-center">
              Productos de tus POP/STARS favoritas de League Of Legends. Juega
              con Ahri, Seraphine, Akali, Evelynn o Kai'sa y domina la grieta
              del invocador. Ya disponibles en NGG STORE.
            </p>
            <div className="d-grid gap-2">
              <Button className="text-uppercase" variant="primary" size="lg">
                Comprar ahora
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default JumboTron;
