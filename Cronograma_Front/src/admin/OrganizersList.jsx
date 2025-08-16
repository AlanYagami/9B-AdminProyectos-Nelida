import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';
import UserModal from '../components/UserModal';
import { useAuth } from "../context/AuthContext";
import api from '../services/api';

import Swal from 'sweetalert2';

function OrganizersList() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [search, setSearch] = useState('');
  const [organizadores, setOrganizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("role") || "Sin rol";
  const username = localStorage.getItem("username") || "Sin nombre";

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Obtener organizadores de la API
  const fetchOrganizadores = async () => {
    try {
      setLoading(true);
      const response = await api.usuarios.getAll();

      // excluir rol 1
      const organizadoresFiltrados = (response.data || []).filter(
        user => user.rol?.idRol !== 1
      );

      setOrganizadores(organizadoresFiltrados);
      setError(null);
    } catch (err) {
      console.error("Error al cargar organizadores:", err);
      setError("No se pudieron cargar los organizadores");
    } finally {
      setLoading(false);
    }
  };

  //Editar organizador
  const onEdit = (row) => {
    setSelectedUser(row);
    setShowModal(true);
  };

  const handleUpdateUser = async (formData) => {
    try {
      if (formData.contrasena || formData.repetirContrasena) {
        if (formData.contrasena !== formData.repetirContrasena) {
          Swal.fire({
            icon: "warning",
            title: "Contraseñas no coinciden",
            text: "Asegúrate de que ambas contraseñas sean iguales",
            confirmButtonColor: "#667eea",
            background: "#2c2c2c",
            color: "white",
          });
          return;
        }
      }

      const usuarioData = {
        nombre: formData.nombre,
        correo: formData.correo,
        rol: { idRol: 2 },
      };

      if (formData.contrasena) {
        usuarioData.contra = formData.contrasena;
      }

      await api.usuarios.update(selectedUser.idUsuario, usuarioData);

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        background: "#2c2c2c",
        color: "white",
      });

      setShowModal(false);
      setSelectedUser(null);
      await fetchOrganizadores();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        background: "#2c2c2c",
        color: "white",
      });
    }
  };

  //Eliminar organizador
  const onDelete = async (row) => {
    const result = await Swal.fire({
      title: `¿Eliminar organizador "${row.nombre}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d4d",
      cancelButtonColor: "#667eea",
      background: '#2c2c2c',
      color: '#ffffff',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await api.usuarios.delete(row.idUsuario);
        await fetchOrganizadores(); // Recargar lista
        Swal.fire({
          title: "Eliminado",
          text: "El organizador fue eliminado exitosamente.",
          icon: "success",
          background: '#2c2c2c',
          color: '#ffffff',
        });
      } catch (error) {
        console.error("Error al eliminar organizador:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el organizador.",
          icon: "error",
          background: '#2c2c2c',
          color: '#ffffff',
        });
      }
    }
  };

  useEffect(() => {
    fetchOrganizadores();
  }, []);

  //Columnas de la tabla
  const columns = [
    {
      name: "Nombre del Organizador",
      selector: row => row.nombre || "—",
      sortable: true,
    },
    {
      name: "Correo",
      selector: row => row.correo || "—",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div
          className="d-flex flex-wrap"
          style={{ gap: "0.5rem", minWidth: "250px" }}
        >
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#e4a333",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "6px 10px",
              minWidth: "80px",
              fontSize: "0.85rem",
            }}
            onClick={() => onEdit(row)}
          >
            ✏️ Editar
          </button>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "6px 10px",
              minWidth: "80px",
              fontSize: "0.85rem",
            }}
            onClick={() => onDelete(row)}
          >
            🗑️ Eliminar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Filtrado de búsqueda
  const filteredData = organizadores.filter(item =>
    (item.evento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.correo || "").toLowerCase().includes(search.toLowerCase())
  );

  // Estilos de la tabla
  const customStyles = {
    table: { style: { backgroundColor: "#2a2a2e", color: "#e0e0e0" } },
    headCells: { style: { backgroundColor: "#333", color: "#e0e0e0", fontWeight: "bold" } },
    rows: { style: { backgroundColor: "#2a2a2e", color: "#fff", minHeight: "56px" } },
    pagination: { style: { backgroundColor: "#2a2a2e", color: "#e0e0e0" } },
    subHeader: { style: { backgroundColor: "#2a2a2e", padding: "10px 0" } },
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#2a2a2e' }}>
      <Sidebar onLogout={logout} role={userRole} username={username} />

      <div className="flex-grow-1 p-4">
        <h3 className="text-white mb-4">Lista de Organizadores</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          customStyles={customStyles}
          theme="dark"
          subHeader
          progressPending={loading}
          subHeaderComponent={
            <div className="d-flex align-items-center">
              <span className="text-white me-2">Buscar:</span>
              <input
                type="text"
                placeholder="Buscar evento..."
                className="form-control w-100 w-md-50 bg-dark text-white border-secondary"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ maxWidth: "300px" }}
              />
            </div>
          }
        />
      </div>
      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUpdateUser}
        userData={selectedUser}
      />
    </div>
  );
}

export default OrganizersList;