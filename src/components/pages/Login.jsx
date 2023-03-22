import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import AuthUser from "./AuthUser";
import Font from "react-font";
function Login({ dark, updateDark }) {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const submitForm = () => {
    //Api Call
    http
      .post("/login", { email: email, password: password })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <div className="container col-lg-6 card mt-auto">
      <Form>
        <Font family="Zeyada">
          <h1 className="fw-bolder  p-2 fs-1 mt-1 ">CONNEXION</h1>
        </Font>
        {error && <Alert variant="danger">{error}</Alert>}
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

        <Button
          variant="dark"
          onClick={submitForm}
          type="button"
          className="mb-2 w-50 "
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
