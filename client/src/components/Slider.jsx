import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SliderHome() {
  return (
    <Container className="border-bottom"> 
      <Carousel controls={false} data-bs-theme="dark" data-bs-controls="false" >
        <Carousel.Item>
          <Container>
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
              <Col data-bs-theme="light" className="col-lg-6 align-items-center">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center">
                  COLECCION LOGITECH K/DA DE LEAGUE OF LEGENDS®{" "}
                </h1>
                <p className="lead text-center">
                  Productos de tus POP/STARS favoritas de League Of Legends.
                  Juega con Ahri, Seraphine, Akali, Evelynn o Kai'sa y domina la
                  grieta del invocador. Ya disponibles en NGG STORE.
                </p>
                <div className="d-grid gap-2">
                  <Button
                    className="text-uppercase"
                    variant="primary"
                    size="lg"
                  >
                    Comprar ahora
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
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
                <h1 data-bs-theme="light" className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center ">
                  COLECCION LOGITECH K/DA DE LEAGUE OF LEGENDS®{" "}
                </h1>
                <p className="lead text-center">
                  Productos de tus POP/STARS favoritas de League Of Legends.
                  Juega con Ahri, Seraphine, Akali, Evelynn o Kai'sa y domina la
                  grieta del invocador. Ya disponibles en NGG STORE.
                </p>
                <div className="d-grid gap-2">
                  <Button
                    className="text-uppercase"
                    variant="primary"
                    size="lg"
                  >
                    Comprar ahora
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
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
                <h1 data-bs-theme="light" className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center ">
                  COLECCION LOGITECH K/DA DE LEAGUE OF LEGENDS®{" "}
                </h1>
                <p className="lead text-center">
                  Productos de tus POP/STARS favoritas de League Of Legends.
                  Juega con Ahri, Seraphine, Akali, Evelynn o Kai'sa y domina la
                  grieta del invocador. Ya disponibles en NGG STORE.
                </p>
                <div className="d-grid gap-2">
                  <Button
                    className="text-uppercase"
                    variant="primary"
                    size="lg"
                  >
                    Comprar ahora
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default SliderHome;
