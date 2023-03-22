import React from "react";
import { Form } from "react-bootstrap";

function Formulaire({ dark, updateDark }) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control placeholder="Yves Saint Lorent" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
    </>
  );
}

export default Formulaire;
