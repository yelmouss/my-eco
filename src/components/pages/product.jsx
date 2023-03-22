import offres from "../../data/tableaux.json";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Font from "react-font";
import { GiReturnArrow } from "react-icons/gi";
import ProductApi from "./ProductApi";
import { useState, useEffect } from "react";
function Product({ dark, updateDark }) {
  let { id } = useParams();
  id = +id;

  const { getProductById } = ProductApi();

  const [Productdetails, setProduct] = useState("");

  const ProductGet = async (id) => {
    try {
      const response = await getProductById(id);
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ProductGet(id);
  }, [id]);



  const Product = offres.find((Product) => Product.id === id);
  let history = useNavigate();
  if (Product === undefined) {
    return <>Error dans l'id numéro {id} </>;
  } else {
    return (
      <>
        <Container
          className={`d-flex flex-column min-vh-100 SVGGroundRight ${
            dark ? "bg-light text-dark" : "bg-dark text-light"
          }`}
          fluid
        >
          <Row
            xs="auto"
            lg={4}
            md={3}
            className="p-2 d-flex justify-content-center"
          >
            <Col>
              <Card>
                <img
                  src={Product.image}
                  alt={Product.title}
                  className="img-fluid"
                />
              </Card>
            </Col>

            <Col lg={7} className="text-start">
              <Font family="Quicksand">
                <h1 className="fw-bolder  p-2 fs-1">{Product.title}</h1>
                <button
                  onClick={() => history("/")}
                  className="btn float-end text-light"
                >
                  Return to galerie <GiReturnArrow />{" "}
                </button>
                <hr />
                <p className="fs-1">{Product.description}</p>
              </Font>
              <Font family="Quicksand">
                <h1 className="fw-bolder  p-2 fs-1 float-end">
                  Price : {Product.price}
                </h1>
              </Font>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Product;
