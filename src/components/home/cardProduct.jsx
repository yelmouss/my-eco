import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  BsCurrencyEuro,
  BsCartPlus,
  BsFillSuitHeartFill,
  BsSuitHeart,
  BsEye,
} from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


const CardProduct = ({
  item,
  handleAddToCart,
  handleRemoveFromCart,
  itemQuantity,handleLike,
  dark,
  updateDark,
  likes,
  i, 
}) => (
  <Col className="mt-3">
    <Card className={`shadow-lg ${dark ? "" : "text-dark"}`}>
      <Card.Img className="MyImgCard" variant="top" src={  `http://localhost:8000/storage/${item.image_path}`} />    
      <Card.Body>
        <Card.Text className="text-truncate">{item.title}</Card.Text>
        <Card.Text>
          {item.price}
          <BsCurrencyEuro />
        </Card.Text>
      </Card.Body>
      <Card.Body className="fs-5 text-dark p-2">
        <Row>
          <Col>
            {itemQuantity ? (
              <AiOutlineMinusCircle
                className="text-danger"
                onClick={() => handleRemoveFromCart(item)} />
            ) : (
              ""
            )}
            <Link
              className={itemQuantity ? "text-success fs-5  m-1" : ""}
              onClick={() => handleAddToCart(item)}
              style={{ textDecoration: "none" }}
            >
              {itemQuantity ? (
                <>
                  {itemQuantity}
                  <AiOutlinePlusCircle className="m-1" />
                </>
              ) : (
                <BsCartPlus className="fs-2 text-success" />
              )}
            </Link>
          </Col>
          <Col>
            <Link className="btn" onClick={() => handleLike(i)}>
              {likes[i] ? (
                <BsFillSuitHeartFill className="text-danger fs-4" />
              ) : (
                <BsSuitHeart />
              )}
            </Link>
            <Link
              className="btn"
              to={"/Product/" + item.id}
              style={{ textDecoration: "none" }}
            >
              <BsEye className="fs-4" />
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

export default CardProduct;
