import { useEffect, useState, useCallback } from "react";
// import Swal from "sweetalert2";
// import ProjectsData from "http://localhost:8000/api/products";
import Font from "react-font";
import { Container, Col, Row, Card } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Formulaire from "../cart/form";
function Cart({ dark, updateDark }) {
  const [ProjectsData, setState] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
    .then((res) => res.json())
    .then((data) => {
      setState(data);
      const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cartFromStorage);
    } 
    
    )
    .catch((error) => console.error(error));

    
  
  }, []);

  // Récupère les informations sur les likes et le panier à partir du local storage lors du chargement du composant.

  // Met à jour le panier et stocke les données dans le local storage.
  const updateCart = useCallback(
    (newCart) => {
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    [setCart]
  );
  //fonction for remove item from LocalStorage
  const handleRemoveFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity > 1) {
      const newCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      updateCart(newCart);
    } else {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
      updateCart(newCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = ProjectsData.find((p) => (p.id = item.id));
      return total + product.price * item.quantity;
    }, 0);
  };

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    }
    const newCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
    );
    updateCart(newCart);
  };

  return (
    <>
      <Container
        className={`d-flex flex-column min-vh-100 SVGGround ${
          dark ? "bg-light text-dark" : "bg-dark text-light"
        }`}
        fluid
      >
        <Font family="Zeyada">
          <h1 className=" fw-bolder p-2 fs-1 ">My Cart</h1>
        </Font>
        <hr />
        <Row>
          <Col>
            {console.log(cart)}
            {console.log(ProjectsData)}
         
            
            {cart.map((item, index) => {
              const product = ProjectsData.find((p) => p.id === item.id);
              console.log(product)
              return (
                <div key={index}>
                  <Card
                    className={`mb-1 SVGGroundLeft ${
                      dark ? "bg-light text-dark" : "bg-light text-dark"
                    }`}
                  >
                    <Row>
                      <Col lg={4} className="p-3">
                        <Card.Img
                          variant="top"
                          src={  `http://localhost:8000/storage/${product.image_path}`}
                          className="img-fluid"
                        />
                      </Col>
                      <Col>
                        <Card.Body>
                          <Card.Title>
                            {product.title} - Price : {product.price} Quantity :{" "}
                            {item.quantity}
                          </Card.Title>
                          <Card.Text>{product.description}</Card.Text>
                          <footer className="p-5 text-end">
                            <button
                              className="btn  fs-2"
                              onClick={() =>
                                handleUpdateQuantity(item, item.quantity - 1)
                              }
                            >
                              <AiOutlineMinusCircle />
                            </button>
                            <button
                              className="btn fs-2"
                              onClick={() =>
                                handleUpdateQuantity(item, item.quantity + 1)
                              }
                            >
                              <AiOutlinePlusCircle />
                            </button>
                            <button
                              className="btn fs-3"
                              onClick={() => handleRemoveFromCart(item)}
                            >
                              <RiDeleteBinLine className="text-danger" />
                            </button>
                          </footer>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </div>
              );
            })}
          </Col>
          <Col>
            <Font family="Zeyada">
              <h1 className="  p-2 fs-1 ">
                Total Price:{" "}
                <i className="fw-bold text-success"> {getTotalPrice()} </i> Dh
              </h1>
              <hr />
            </Font>
            <Formulaire />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
