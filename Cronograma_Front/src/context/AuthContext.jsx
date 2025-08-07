import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);
  const [role, setRole] = useState(storedRole || "");

  const login = (token) => {
    const decoded = jwtDecode(token);
    const userRole = decoded.rol?.toLowerCase();
    const userId = decoded.id;
    const username = decoded.nombre;

    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setRole(userRole);
    return userRole;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setRole("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
