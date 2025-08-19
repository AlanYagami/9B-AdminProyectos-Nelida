import axios from "axios";
import { API_BASE_URL } from "./config";

const apiPublicClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiPublicClient.interceptors.response.use(
  response => response,
  error => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Ocurrió un error en la petición.',
    });
    return Promise.reject(error);
  }
);


export default apiPublicClient;