import AuthUser from "./AuthUser";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsFillBagFill,
  BsFillBagPlusFill,
  BsFillPeopleFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { Card, ListGroup } from "react-bootstrap";
import Font from "react-font";
function Dashboard({ dark, updateDark }) {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [countProduct, setcountProduct] = useState("");

  useEffect(() => {
    CountProduct();
    fetchUserDetail();
  }, []);

  const CountProduct = () => {
    fetch("http://localhost:8000/api/count")
      .then((res) => res.json())
      .then((data) => {
        setcountProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  function renderElement() {
    if (userdetail.admin === null) {
      return (
        <>
          <Font family="Zeyada">
            <h1>Dashboard</h1>
          </Font>
          <h1>Name</h1>
          <p>{userdetail.name}</p>
          <h1>Email</h1>
          <p>{userdetail.email}</p>
        </>
      );
    } else if (userdetail) {
      return (
        <>
          <div className="container mt-5">
            <Font family="Zeyada">
              <h1>Dashboard Admin</h1>
            </Font>
            <div className="row">
              <p>Connected user : {userdetail.name}</p>
              <div className="col-lg-2 col-md-4">
                <Card className="h-100">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5">Users</ListGroup.Item>
                    <ListGroup.Item className="fs-3">
                      <div className="row">
                        <div className="col">
                          <Link
                            to="/ProductManagement"
                            className="btn btn-dark text-light"
                          >
                            <BsFillBagPlusFill /> manage
                          </Link>
                        </div>
                        <div className="col">
                          {countProduct.countUsers} <BsFillPeopleFill />
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
              <div className="col-lg-2 col-md-4">
                <Card className="h-100">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5">
                      Products available
                    </ListGroup.Item>
                    <ListGroup.Item className="fs-3">
                      <div className="row">
                        <div className="col">
                          <Link
                            to="/ProductManagement"
                            className="btn btn-info text-light"
                          >
                            <BsFillBagPlusFill /> manage
                          </Link>
                        </div>
                        <div className="col">
                          {countProduct.countProd} <BsFillBagFill />
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
              <div className="col-lg-2 col-md-4">
                <Card className="h-100">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5">
                      Current Orders
                    </ListGroup.Item>
                    <ListGroup.Item className="fs-3">
                      <div className="row">
                        <div className="col">
                          <Link
                            to="/ProductManagement"
                            className="btn btn-success"
                          >
                            <BsFillBagPlusFill /> manage
                          </Link>
                        </div>
                        <div className="col">
                          {countProduct.countorder} <BsFillCartCheckFill />
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>Loading ....</p>
        </>
      );
    }
  }

  return <div>{renderElement()}</div>;
}

export default Dashboard;
