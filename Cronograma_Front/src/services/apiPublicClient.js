import axios from "axios";

const apiPublicClient = axios.create({
  baseURL: "http://192.168.0.123:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublicClient;