// src/services/api.js
import apiClient from "./axiosConfig";

const api = {
  auth: {
    login: (credentials) => apiClient.post('/api/auth', credentials),
    register: (userData) => apiClient.post('/api/auth/register', userData),
    forgotPassword: (email) => apiClient.post('/api/auth/forgot-password', { correo: email }), 
    resetPassword: (token, newPassword) => apiClient.post('/api/auth/reset-password', { token, nuevaContraseña: newPassword }), 
  },

  eventos: {
    getAll: () => apiClient.get('/api/eventos'),
    getById: (id) => apiClient.get(`/api/eventos/${id}`),
    getByUser: (userId) => apiClient.get(`/api/eventos/mis-eventos/${userId}`),
    create: (eventoData) => apiClient.post('/api/eventos', eventoData),
    update: (id, eventoData) => apiClient.put(`/api/eventos/${id}`, eventoData),
    delete: (id) => apiClient.delete(`/api/eventos/${id}`),
  },

  bloques: {
    getAll: () => apiClient.get('/api/bloques'), 
    getById: (id) => apiClient.get(`/api/bloques/${id}`), 
    getByEvento: (idEvento) => apiClient.get(`/api/bloques/evento/${idEvento}`), 
    create: (bloqueData) => apiClient.post('/api/bloques', bloqueData),
    update: (id, bloqueData) => apiClient.put(`/api/bloques/${id}`, bloqueData),
    delete: (id) => apiClient.delete(`/api/bloques/${id}`),
  },

  estados: {
    getAll: () => apiClient.get('/api/estados'), 
    getById: (id) => apiClient.get(`/api/estados/${id}`),
    getByNombre: (nombre) => apiClient.get(`/api/estados/nombre/${nombre}`),
    create: (estadoData) => apiClient.post('/api/estados', estadoData),
    update: (id, estadoData) => apiClient.put(`/api/estados/${id}`, estadoData),
    delete: (id) => apiClient.delete(`/api/estados/${id}`),
  },

  tipoEvento: {
    getAll: () => apiClient.get('/api/tipos-evento'),
    getById: (id) => apiClient.get(`/api/tipos-evento/${id}`),
    getByNombre: (nombre) => apiClient.get(`/api/tipos-evento/nombre/${nombre}`), 
    create: (tipoEventoData) => apiClient.post('/api/tipos-evento', tipoEventoData), 
    update: (id, tipoEventoData) => apiClient.put(`/api/tipos-evento/${id}`, tipoEventoData),
    delete: (id) => apiClient.delete(`/api/tipos-evento/${id}`),
  },

  usuarios: {
    getAll: () => apiClient.get('/api/usuarios'), 
    getById: (id) => apiClient.get(`/api/usuarios/${id}`), 
    getByCorreo: (correo) => apiClient.get(`/api/usuarios/correo/${correo}`), 
    crear: (usuarioData) => apiClient.post('/api/usuarios', usuarioData), 
    update: (id, usuarioData) => apiClient.put(`/api/usuarios/${id}`, usuarioData), 
    delete: (id) => apiClient.delete(`/api/usuarios/${id}`), 
  },
};

export default api;