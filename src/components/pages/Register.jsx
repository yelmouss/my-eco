import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";
import Font from "react-font";

function Register() {
  const Navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const submitForm = () => {
    //Api Call
    http
      .post("/register", { email: email, password: password, name: name })
      .then((res) => {
        Navigate("/login");
      });
  };
  return (
    <div className="container col-lg-6 card mt-auto">
      <Form>
        <Font family="Zeyada">
          <h1 className="fw-bolder  p-2 fs-1 mt-1 ">REGISTER</h1>
        </Font> 
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Full Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" onClick={submitForm} type="button" className=" w-50 mb-1">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
