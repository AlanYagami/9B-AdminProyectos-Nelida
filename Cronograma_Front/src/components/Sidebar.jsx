import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaSignOutAlt, FaHome, FaBars } from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";

const Sidebar = ({ onLogout, role = "usuario", username = "usuario" }) => {
  const [show, setShow] = useState(false);

  const menuOptions = {
    role_admin: [
      { path: "/admin/logged-events", label: "Eventos", icon: <FaCalendarAlt /> },
      { path: "/admin/organizers-list", label: "Organizadores", icon: <FaUsers /> },
    ],
    role_organizador: [
      { path: "/organizer/my-events", label: "Mis Eventos", icon: <FaCalendarAlt /> },
      { path: "/organizer/History", label: "Historial", icon: <FaUsers /> },
    ],
    usuario: [
      { path: "/home", label: "Eventos Disponibles", icon: <FaCalendarAlt /> },
      { path: "/", label: "Landing", icon: <FaHome /> },
    ],
  };

  const buttonStyle = {
    backgroundColor: "#764BA2",
    color: "white",
  };

  const options = menuOptions[role] || [];

  // Estilo compartido para el contenido del sidebar
  const sidebarContent = (
    <>
      {/* Logo y nombre */}
      <div className="mb-4 text-center">
        <div
          className="rounded-circle p-3 mb-2 mx-auto"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#764BA2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Cambia "L" por la primera letra del username */}
          <span className="fw-bold fs-4">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <h5>{username}</h5>
      </div>

      {/* Navegación */}
      <ul className="nav nav-pills flex-column mb-auto">
        {options.map((item, idx) => (
          <li className="nav-item" key={idx}>
            <NavLink
              to={item.path}
              className="nav-link text-white"
              style={({ isActive }) => (isActive ? buttonStyle : undefined)}
              onClick={() => setShow(false)}
            >
              {item.icon} <span className="ms-2">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="mt-auto">
        {role === "usuario" ? (
          <NavLink to="/login" className="btn w-100" style={buttonStyle}>
            <FaSignOutAlt className="me-2" />
            ¿Eres organizador?
          </NavLink>
        ) : (
          <button className="btn w-100" style={buttonStyle} onClick={onLogout}>
            <FaSignOutAlt className="me-2" />
            Cerrar Sesión
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button
        className="btn btn-dark d-md-none m-2"
        onClick={() => setShow(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar fijo en pantallas grandes */}
      <div
        className="d-none d-md-flex flex-column vh-100 p-3 bg-dark text-white"
        style={{ width: "240px", boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)" }}
      >
        {sidebarContent}
      </div>

      {/* Sidebar Offcanvas para móviles */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start"
        className="bg-dark text-white"
        style={{ width: "240px" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
