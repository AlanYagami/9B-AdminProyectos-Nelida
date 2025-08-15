import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';
import { useAuth } from "../context/AuthContext";
import api from '../services/api';

function OrganizersList() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [search, setSearch] = useState('');
  const [organizadores, setOrganizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("role") || "Sin rol";
  const username = localStorage.getItem("username") || "Sin nombre";

  // Obtener organizadores de la API
  const fetchOrganizadores = async () => {
    try {
      setLoading(true);
      // Aquí usa tu endpoint real, por ejemplo:
      const response = await api.usuarios.getAll();
      setOrganizadores(response.data || []);
      console.log("Organizadores cargados:", response.data);
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
    console.log("Editar", row);
    // Aquí podrías navegar a un formulario
    // navigate(`/editar-organizador/${row.idUsuario}`);
  };

  //Eliminar organizador
  const onDelete = async (row) => {
    if (!window.confirm(`¿Seguro que quieres eliminar a ${row.nombre || row.correo}?`)) return;
    try {
      await api.usuarios.delete(row.idUsuario); // o el id correspondiente
      fetchOrganizadores(); // Recargar lista
    } catch (err) {
      console.error("Error al eliminar organizador:", err);
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
      wrap: true,
      grow: 3,
      maxWidth: "400px",
    },
    {
      name: "Correo",
      selector: row => row.correo || "—",
      sortable: true,
      wrap: true,
      grow: 4,
      maxWidth: "500px",
    },
    {
      name: "Fecha de Registro",
      selector: row => {
        if (!row.fechaRegistro) return "—";
        const fecha = new Date(row.fechaRegistro);
        return fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      sortable: true,
      center: true,
      grow: 1,
      maxWidth: "250px",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div
          className="d-flex flex-wrap justify-content-center align-items-center"
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
      grow: 3,
    },
  ];

  // 🔹 Filtrado de búsqueda
  const filteredData = organizadores.filter(item =>
    (item.evento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.correo || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.fecha || "").includes(search)
  );

  // 🔹 Estilos de la tabla
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
    </div>
  );
}

export default OrganizersList;