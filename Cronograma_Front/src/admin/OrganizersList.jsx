import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';

function OrganizersList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const userRole = "admin"; // por consistencia con LoggedEvents

  const onEdit = (row) => {
    // Acción editar, ejemplo:
    console.log("Editar", row);
  };

  const onDelete = (row) => {
    // Acción eliminar, ejemplo:
    console.log("Eliminar", row);
  };

  const columns = [
  {
    name: "Evento",
    selector: row => row.evento,
    sortable: true,
    wrap: true,
    grow: 3, // más espacio que otras columnas
    maxWidth: "400px",
  },
  {
    name: "Correo",
    selector: row => row.correo,
    sortable: true,
    wrap: true,
    grow: 4, // correo suele ser largo
    maxWidth: "500px",
  },
  {
    name: "Fecha",
    selector: row => row.fecha,
    sortable: true,
    center: true,
    grow: 1,
    maxWidth: "200px",
  },
  {
    name: "Acciones",
    cell: (row) => (
      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{
          gap: "0.5rem",
          minWidth: "250px",
        }}
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



  const data = [
    { evento: "Conferencia 11", correo: "juan@gmail.com", fecha: "16/07/2025" },
    { evento: "Evento 2", correo: "otro@ejemplo.com", fecha: "20/07/2025" },
  ];

  const filteredData = data.filter(item =>
    item.evento.toLowerCase().includes(search.toLowerCase()) ||
    item.correo.toLowerCase().includes(search.toLowerCase()) ||
    item.fecha.includes(search)
  );

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
        <h3 className="text-white mb-4">Lista de Organizadores</h3>

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
