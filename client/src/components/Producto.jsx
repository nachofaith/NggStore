import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

function TipoBadge(text) {
  if (text === "oferta") {
    const tipo = "danger";
    return tipo;
  }
  if (text === "nuevo") {
    const tipo = "success";
    return tipo;
  }
}

function Producto({ text }) {
  // const tipo = text == "oferta" ? "danger" : "success";

  const apiUrl = "https://fakestoreapi.com/products?limit=4";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los productos del archivo JSON usando Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return products.map((product) => (
    <Card style={{ width: "18rem" }} key={product.id} >
      <Row className="justify-content-md-center text-uppercase fs-5">
        
        <Col md="auto">
   
          <Badge pill bg={TipoBadge(text)}>
            {/* <Badge pill bg={tipo}> */}
            {text}
          </Badge>
        </Col>
      </Row>
      
    <Card.Img variant="top" src="https://i0.wp.com/tienda.ngg.cl/wp-content/uploads/2023/12/FRONT.png?fit=600%2C600&ssl=1" />

      <Card.Body>
        <Card.Title className="text-uppercase fs-4 fw-light text-center">
          {product.title}
        </Card.Title>

        <ListGroup className="list-group-flush border-top text-center h-100">
          <ListGroup.Item>
            <h4 className="fw-bold text-center">
              <del className="fw-light fs-5">$54.990</del> ${product.price}
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge className="text-center text-uppercase" bg="secondary">
            {product.category}
            </Badge>{" "}
            <Badge className="text-center text-uppercase" bg="dark">
              hyperx
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>

        <div className="row align-items-end gap-2 p-4">
          <Button variant="primary" size="md">
            Comprar ahora
          </Button>
          <Button variant="primary" size="md">
            Agregar al carro
          </Button>
        </div>
    
    </Card>
  ));
}

export default Producto;
