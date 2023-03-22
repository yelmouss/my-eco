import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Font from "react-font";
const ProductManagement = () => {
  const { http } = AuthUser();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionType, setActionType] = useState("create");

  const [userdetail, setUserdetail] = useState("");

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const handleShowModal = (type, product) => {
    setActionType(type);
    setSelectedProduct(product);
    setShowModal(true);
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await http.delete(`/products/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProduct = async () => {
    try {
      const formDataObject = new FormData();
      formDataObject.append("title", formData.title);
      formDataObject.append("price", formData.price);
      formDataObject.append("description", formData.description);
      formDataObject.append("image", formData.image);

      if (actionType === "create") {
        await http.post("/products", formDataObject, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (actionType === "update" && selectedProduct) {
        await http.put(`/products/${selectedProduct.id}`, formDataObject, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      handleCloseModal();
      setProducts(await fetchProducts());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await http.get("/products");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await fetchProducts());
    };
    getProducts();
  }, []);

  if (userdetail.admin === null) {
    return <>Réservé Aux Administrateurs</>;
  } else {
    return (
      <>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form enctype="multipart/form-data">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image Path</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter image path"
                  id="image"
                  // onChange={handleChange}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveProduct}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container mt-5">
          <Font family="Zeyada">
            <h1>Product Management</h1>
          </Font>

          <div className="float-end p-2">
            <Button
              variant="success"
              onClick={() => handleShowModal("create", null)}
            >
              <FaPlus /> Add Product
            </Button>
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/storage/${product.image_path}`}
                      alt={product.image_path}
                      className="img-fluid col-lg-2"
                    />
                  </td>
                  <td className="">
                    <FaEdit
                      onClick={() => handleShowModal("update", product)}
                      className="fs-4 border border-light p-1"
                    />
                    <FaTrash
                      onClick={() => handleDeleteProduct(product.id)}
                      className="fs-4 border border-light p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
};

export default ProductManagement;
