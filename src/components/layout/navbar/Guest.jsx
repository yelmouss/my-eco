import { Route, Routes, Link } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar,NavDropdown } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import logoBlank from "../../../logoBlank.png";
import logoDark from "../../../LogoDark.png";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import Cart from "../../pages/cart";
import { TfiShoppingCartFull, TfiUser } from "react-icons/tfi";
import Product from "../../pages/product";
import Footer from "./Footer";
function Guest() {
  const [dark, updateDark] = useState(null);
  const ModeDark = JSON.parse(localStorage.getItem("dark"));
  useEffect(() => {
    if (ModeDark) {
      updateDark(ModeDark);
    }
  }, [ModeDark]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={`${dark ? "light" : "dark"}`}
        variant={`${dark ? "light" : "dark"}`}
      >
        <Container>
          <Navbar.Brand href="/" className="me-auto">
            {dark ? (
              <img src={logoDark} width="100" height="50" alt="React logo" />
            ) : (
              <img src={logoBlank} width="100" height="50" alt="React logo" />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            Menu
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>
                {" "}
                {dark ? (
                  <BsFillSunFill
                    onClick={() =>
                      updateDark(!dark, localStorage.setItem("dark", !dark))
                    }
                  />
                ) : (
                  <BsMoonStarsFill
                    onClick={() =>
                      updateDark(!dark, localStorage.setItem("dark", !dark))
                    }
                  />
                )}
              </Nav.Link>
              <Link to="cart" className="nav-link">
                <TfiShoppingCartFull /> Panier
              </Link>
              <Link to="/" className="nav-link">
                Home
              </Link>

              <NavDropdown title={<TfiUser />} id="basic-nav-dropdown">      
                <Link to="login" className="dropdown-item">
                Login
              </Link>
              <Link to="register" className="dropdown-item">
              Register
              </Link>     
              </NavDropdown>
         
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Home dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/login"
          element={<Login dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/cart"
          element={<Cart dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/register"
          element={<Register dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/Product/:id"
          element={<Product dark={dark} updateDark={updateDark} />}
        />
      </Routes>
      <Footer dark={dark} updateDark={updateDark}  />
    </>
  );
}

export default Guest;
