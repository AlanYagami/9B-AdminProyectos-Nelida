import React from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaSignOutAlt, FaHome } from "react-icons/fa";

// Roles: 'admin', 'organizador', 'usuario'
const Sidebar = ({ onLogout, role = "admin", username = "Admin" }) => {
  const menuOptions = {
    admin: [
      { path: "/admin/logged-events", label: "Eventos", icon: <FaCalendarAlt /> },
      { path: "/admin/organizers-list", label: "Organizadores", icon: <FaUsers /> },
    ],
    organizador: [
      { path: "/organizer/my-events", label: "Mis Eventos", icon: <FaCalendarAlt /> },
    ],
    usuario: [
      { path: "/user/events", label: "Eventos Disponibles", icon: <FaCalendarAlt /> },
    ],
  };

  const logoutButtonColors = {
    admin: "btn-warning",
    organizador: "btn-danger",
    usuario: "btn-secondary",
  };

  const options = menuOptions[role] || [];
  const logoutClass = logoutButtonColors[role] || "btn-primary";

  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-dark text-white"
      style={{ width: "240px", boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Logo y nombre */}
      <div className="mb-4 text-center">
        <div
          className="bg-primary rounded-circle p-3 mb-2 mx-auto"
          style={{ width: "60px", height: "60px" }}
        >
          <span className="fw-bold fs-4">L</span>
        </div>
        <h5>{username}</h5>
      </div>

      {/* Navegacion */}
      <ul className="nav nav-pills flex-column mb-auto">
        {options.map((item, idx) => (
          <li className="nav-item" key={idx}>
            <NavLink to={item.path} className="nav-link text-white">
              {item.icon} <span className="ms-2">{item.label}</span>
            </NavLink>
          </li>
        ))}
        {/* Home (todos) */}
        <li>
          <NavLink to="/" className="nav-link text-white">
            <FaHome className="me-2" />
            Home
          </NavLink>
        </li>
      </ul>

      {/* Boton de logout con color dinamico */}
      <div className="mt-auto">
        <button className={`btn ${logoutClass} w-100`} onClick={onLogout}>
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
