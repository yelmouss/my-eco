import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Font from "react-font";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardProduct from "../home/cardProduct";

const Home = ({ dark, updateDark }) => {
  const [likes, setLikes] = useState([]);
  const [cart, setCart] = useState([]);
  const MySwal = withReactContent(Swal);
  // Récupère les informations sur les likes et le panier à partir du local storage lors du chargement du composant.
  useEffect(() => {
    const likesFromStorage = JSON.parse(localStorage.getItem("likes")) || [];
    setLikes(likesFromStorage);
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartFromStorage);
  }, []);

  // Met à jour le panier et stocke les données dans le local storage.
  const updateCart = useCallback(
    (newCart) => {
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      Swal.fire({
        icon: "error",
        title: "1 Product removed",
      });
    },
    [setCart]
  );

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Liked",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const newCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      updateCart(newCart);
    } else {
      const newCart = [
        ...cart,
        { id: item.id, price: item.price, quantity: 1 },
      ];
      updateCart(newCart);
    }

    MySwal.fire({
      title: <strong>Great!</strong>,
      html: <i>Product added to Cart!</i>,
      icon: "success",
    });
  };
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

  const [state, setState] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(data => setState(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container
      className={`d-flex flex-column min-vh-100 SVGGround ${
        dark ? "bg-light text-dark" : "bg-dark text-light"
      }`}
      fluid
    >
      <Container className="mt-2 p-2">
        <Font family="Zeyada">
          <h1 className="fw-bolder  p-2 fs-1 ">
            Bienvenue dans notre galerie digitale artistique
          </h1>
        </Font>
        <Row
          xs="auto"
          lg={4}
          md={3}
          className="p-2 d-flex justify-content-center"
        >
          {state.map((item, i) => {
            const existingCartItem = cart.find(
              (cartItem) => cartItem.id === item.id
            );
            const itemQuantity = existingCartItem
              ? // ? existingCartItem.quantity + " Au panier"
                existingCartItem.quantity
              : 0;
            return (
              <div key={item.id} >
                <CardProduct
                  item={item}
                  itemQuantity={itemQuantity}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleLike={handleLike}
                  likes={likes}
                  i={i}
                />
              </div>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
