import { Route, Routes, Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Home from "../../pages/Home";
import Dashboard from "../../pages/Dashboard";
import AuthUser from "../../pages/AuthUser";
import logoBlank from "../../../logoBlank.png";
import logoDark from "../../../LogoDark.png";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import Footer from "./Footer";
import { TfiShoppingCartFull, TfiUser } from "react-icons/tfi";
import Cart from "../../pages/cart";
import Product from "../../pages/product";
import ProductManagement from "../../pages/ProductManager";

function Auth() {
  const [dark, updateDark] = useState(null);
  const ModeDark = JSON.parse(localStorage.getItem("dark"));
  useEffect(() => {
    if (ModeDark) {
      updateDark(ModeDark);
    }
  }, [ModeDark]);

  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };

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
              <Link to="Cart" className="nav-link">
                <TfiShoppingCartFull /> Panier
              </Link>
              <Link to="/" className="nav-link">
                Home
              </Link>

              <NavDropdown title={<TfiUser />} id="basic-nav-dropdown">
                <Link to="dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <span className="dropdown-item" onClick={logoutUser}>
                  Logout
                </span>
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
          path="/dashboard"
          element={<Dashboard dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/cart"
          element={<Cart dark={dark} updateDark={updateDark} />}
        />
        <Route
          path="/Product/:id"
          element={<Product dark={dark} updateDark={updateDark} />}
        />
            <Route
          path="/ProductManagement"
          element={<ProductManagement dark={dark} updateDark={updateDark} />}
        />
      </Routes>
      
      <Footer dark={dark} updateDark={updateDark} />
    </>
  );
}

export default Auth;
