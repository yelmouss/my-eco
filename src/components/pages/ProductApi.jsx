import axios from "axios";

export default function ProductApi() {
  const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
    },
  });
  const getProductById = async (id) => {
    const response = await http.get(`/products/${id}`);
    return response.data;
  };

  return {
    getProductById,
  };
}

