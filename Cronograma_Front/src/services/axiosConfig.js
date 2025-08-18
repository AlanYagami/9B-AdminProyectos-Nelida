import axios from "axios";
import Swal from "sweetalert2";

const apiClient = axios.create({
  baseURL: "http://192.168.0.123:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de petición: añade el token si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: muestra alerta si hay error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Si es un error 401 o 403, podrías cerrar sesión
    if (status === 401 || status === 403) {
      // Aquí podrías emitir un evento de logout o redirigir
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Algo salió mal",
      confirmButtonColor: "#667eea",
      background: "#2c2c2c",
      color: "white",
    });

    return Promise.reject(error);
  }
);

export default apiClient;