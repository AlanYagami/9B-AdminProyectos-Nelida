import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';

function OrganizersList() {
  const containerStyle = {
    minHeight: '100vh',
    background: '#2a2a2e',
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  };

  const textStyle = {
    color: 'white',
    margin: '20px',
  };

  const inputStyle = {
    backgroundColor: '#ffffffff',
    //color: 'white',
  };

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  
  const columns = [
    { name: "Evento", selector: row => row.evento, sortable: true },
    { name: "Correo", selector: row => row.correo },
    { name: "Fecha", selector: row => row.fecha },
    {
      name: "Acciones",
        cell: (row) => (
        <div className="d-flex gap-2">
            <button className="btn btn-warning btn-sm" onClick={() => onEdit(row)}>
            ✏️ Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(row)}>
            🗑️ Cancelar
            </button>
        </div>
        ),
    },
  ];

  const data = [
    { evento: "Conferencia 11", correo: "juan@gmail.com", fecha: "16/07/2025" },
    { evento: "Evento 2", correo: "otro@ejemplo.com", fecha: "20/07/2025" },
  ];

  // Filtrar datos
  const filteredData = data.filter(item =>
    item.evento.toLowerCase().includes(search.toLowerCase()) ||
    item.correo.toLowerCase().includes(search.toLowerCase()) ||
    item.fecha.includes(search)
  );

  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-4">
          <h3 className="mb-4" style={textStyle}>Lista de Organizadores</h3>
          
          <DataTable
            columns={columns}
            data={filteredData}
            theme='dark'
            pagination
            highlightOnHover
            responsive
            subHeader
            subHeaderComponent={
                <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                    <span style={{ color: 'white' }}>Buscar:</span>
                    <input
                        type="text"
                        placeholder="Buscar evento..."
                        className="form-control"
                        style={{ ...inputStyle, width: '250px' }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

            }
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizersList;
