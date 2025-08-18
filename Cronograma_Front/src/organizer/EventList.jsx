import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from './../components/Sidebar';
import CreateEventModal from '../components/CreateEventModal';
import { useAuth } from "../context/AuthContext";
import api from './../services/api';

import Swal from 'sweetalert2';

function EventList() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [search, setSearch] = useState('');
    const [eventos, setEventos] = useState([]);
    const [tiposEvento, setTiposEvento] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);

    const userRole = localStorage.getItem("role") || "Sin rol";
    const username = localStorage.getItem("username") || "Sin nombre";

    const fetchEventos = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await api.eventos.getByUser(userId);
            setEventos(response.data.filter(
                (ev) => new Date(ev.fechaFin) > new Date()
            ));

            console.log("Eventos cargados:", response.data);

            const tiposResponse = await api.tipoEvento.getAll();
            setTiposEvento(tiposResponse.data);
            setError(null);
        } catch (error) {
            console.error("Error al cargar eventos:", error);
            setError("No se pudieron cargar los eventos");
            setEventos([]);
        } finally {
            setLoading(false);
        }
    };

  const onEdit = (row) => {
    setSelectedEvento(row);
    setShowModal(true);
  };

  const handleUpdateEvento = async (formData) => {
    try {
      await api.eventos.update(selectedEvento.idEvento, formData);

      Swal.fire({
        icon: "success",
        title: "Evento actualizado",
        background: "#2c2c2c",
        color: "white",
      });

      setShowModal(false);
      setSelectedEvento(null);
      fetchEventos();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar evento",
        background: "#2c2c2c",
        color: "white",
      });
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
        name: "Nombre",
        selector: row => row.nombreEvento || "—",
        sortable: true,
    },
    {
        name: "Descripción",
        selector: row => row.descripcionEvento || "—",
        sortable: true,
    },
    {
        name: "Tipo de Evento",
        selector: row => row.tipoEvento?.tipoEvento || "—",
        sortable: true,
    },
    {
        name: "Duración en horas",
        selector: row => row.numHoras ?? "—",
        sortable: true,
    },
    {
        name: "Hora Inicio",
        selector: row => {
            if (!row.horaInicio) return "--:--";
            const hora = new Date(`1970-01-01T${row.horaInicio}`);
            return hora.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
        }
    },
    {
        name: "Hora Fin",
        selector: row => {
            if (!row.horaFin) return "--:--";
            const hora = new Date(`1970-01-01T${row.horaFin}`);
            return hora.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
        }
    },
    {
      name: "Fecha Inicio",
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
      name: "Fecha Fin",
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
        name: "Ubicación",
        selector: row => row.ubicacion || "—",
        sortable: true,
    },
    {
        name: "Responsable",
        selector: row => row.responsable || "—",
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

  const filteredData = eventos.filter(item =>
    (item.nombreEvento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.descripcionEvento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.tipoEvento?.tipoEvento || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.ubicacion || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.responsable || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.fechaInicio || "").includes(search) ||
    (item.fechaFin || "").includes(search)
  );

  const customStyles = {
    table: { style: { backgroundColor: "#2a2a2e", color: "#e0e0e0" } },
    headCells: { style: { backgroundColor: "#333", color: "#e0e0e0", fontWeight: "bold" } },
    rows: {style: { backgroundColor: "#2a2a2e", color: "#fff"} },
    pagination: { style: { backgroundColor: "#2a2a2e", color: "#e0e0e0" } },
    subHeader: { style: { backgroundColor: "#2a2a2e", padding: "10px 0" } },
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#2a2a2e' }}>
      <Sidebar onLogout={logout} role={userRole} username={username} />

      <div className="flex-grow-1 p-4">
        <h3 className="text-white mb-4">Lista de Eventos Activos</h3>

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
      <CreateEventModal
  show={showModal}
  onClose={() => {
    setShowModal(false);
    setSelectedEvento(null);
  }}
  onRegister={handleUpdateEvento}
  onUpdate={handleUpdateEvento}
  evento={selectedEvento}
  />
    </div>
  );
}

export default EventList;
