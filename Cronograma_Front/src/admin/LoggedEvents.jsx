import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';
import { useAuth } from "../context/AuthContext";
import api from '../services/api';

import Swal from 'sweetalert2';

function LoggedEvents() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [search, setSearch] = useState('');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("role") || "Sin rol";
  const username = localStorage.getItem("username") || "Sin nombre";

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await api.eventos.getAll();
      setEventos(response.data || []);
      console.log("Eventos cargados:", response.data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
      setError("No se pudieron cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (row) => {
    const result = await Swal.fire({
      title: `¿Eliminar evento "${row.nombreEvento}"?`,
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
        await api.eventos.delete(row.idEvento);
        await fetchEventos(); // Recargar lista
        Swal.fire({
          title: "Eliminado",
          text: "El evento fue eliminado exitosamente.",
          icon: "success",
          background: '#2c2c2c',
          color: '#ffffff',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error al eliminar evento:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el evento.",
          icon: "error",
          background: '#2c2c2c',
          color: '#ffffff',
        });
      }
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const columns = [
    {
      name: "Nombre del Evento",
      selector: row => row.nombreEvento || "—",
      sortable: true,
    },
    {
      name: "Nombre del Responsable",
      selector: row => row.responsable || "—",
      sortable: true,
    },
    {
      name: "Fecha Inicio del Evento",
      selector: row => {
        if (!row.fechaInicio) return "—";
        const fecha = new Date(row.fechaInicio);
        return fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
      sortable: true,
    },
    {
      name: "Fecha Fin del Evento",
      selector: row => {
        if (!row.fechaFin) return "—";
        const fecha = new Date(row.fechaFin);
        return fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "4px 10px",
          }}
          onClick={() => onDelete(row)}
        >
          🗑️ Eliminar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredData = eventos.filter(item =>
    (item.nombreEvento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.responsable || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.fechaInicio || "").includes(search) ||
    (item.fechaFin || "").includes(search)
  );

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
        <h3 className="text-white mb-4">Eventos Registrados</h3>

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

export default LoggedEvents;
