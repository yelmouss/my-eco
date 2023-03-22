import axios from "axios";

export default function useProductApi(token) {
  const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const getAllProducts = async () => {
    const response = await http.get("/products");
    return response.data;
  };

  const getProductById = async (id) => {
    const response = await http.get(`/products/${id}`);
    return response.data;
  };

  const createProduct = async (productData) => {
    const response = await http.post("/products", productData);
    return response.data;
  };

  const updateProduct = async (id, productData) => {
    const response = await http.put(`/products/${id}`, productData);
    return response.data;
  };

  const deleteProduct = async (id) => {
    const response = await http.delete(`/products/${id}`);
    return response.data;
  };

  return {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

