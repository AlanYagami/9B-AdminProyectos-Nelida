import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';

function LoggedEvents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const userRole = "admin";

  const columns = [
    { name: "Evento", selector: row => row.evento, sortable: true },
    { name: "Responsable", selector: row => row.responsable, sortable: true },
    { name: "Fecha", selector: row => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: () => (
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "4px 10px",
          }}
        >
          🗑️ Eliminar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const data = [
    { evento: "Conferencia 11", responsable: "Juan", fecha: "16/07/2025" },
    { evento: "Evento 2", responsable: "Otro", fecha: "20/07/2025" },
    { evento: "Evento 2", responsable: "Otro", fecha: "20/07/2025" },
  ];

  const filteredData = data.filter(item =>
    item.evento.toLowerCase().includes(search.toLowerCase()) ||
    item.responsable.toLowerCase().includes(search.toLowerCase()) ||
    item.fecha.includes(search)
  );

  // Personalización de la tabla
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#2a2a2e",
        color: "#e0e0e0",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#333",
        color: "#e0e0e0",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#2a2a2e",
        color: "#fff",
        minHeight: "56px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#2a2a2e",
        color: "#e0e0e0",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#2a2a2e",
        padding: "10px 0",
      },
    },
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#2a2a2e' }}>
      <Sidebar onLogout={() => console.log("Logout")} role={userRole} username="admin" />

      <div className="flex-grow-1 p-4">
        <h3 className="text-white mb-4">Eventos Registrados</h3>

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
          subHeaderComponent={
            <div className="d-flex align-items-center">
              <text className="text-white me-2">Buscar:</text>
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
