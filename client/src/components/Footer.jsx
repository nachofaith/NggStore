import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PiePagina() {
  return (
    <>
      <Container>
        <Row className="border-top">
          <Col>
            <div>
              <h4>
                <span className="text-muted">Ngg Store 2024.</span>
              </h4>
            </div>
          </Col>

          <Col>
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PiePagina;
