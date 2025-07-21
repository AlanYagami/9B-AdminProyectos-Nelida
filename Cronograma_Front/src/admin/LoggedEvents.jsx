import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';

function LoggedEvents() {
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

  const buttonDeleteStyle = {
    backgroundColor: '#fa6060ff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const inputStyle = {
    backgroundColor: '#ffffffff',
    //color: 'white',
  };

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  
  const columns = [
    { name: "Evento", selector: row => row.evento, sortable: true },
    { name: "Responsable", selector: row => row.responsable },
    { name: "Fecha", selector: row => row.fecha },
    {
      name: "Acciones",
      cell: () => <button className="btn-sm" style={buttonDeleteStyle}>🗑️ Eliminar</button>,
    },
  ];

  const data = [
    { evento: "Conferencia 11", responsable: "juan", fecha: "16/07/2025" },
    { evento: "Evento 2", responsable: "otro", fecha: "20/07/2025" },
  ];

  // Filtrar datos
  const filteredData = data.filter(item =>
    item.evento.toLowerCase().includes(search.toLowerCase()) ||
    item.responsable.toLowerCase().includes(search.toLowerCase()) ||
    item.fecha.includes(search)
  );

  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-4">
          <h3 className="mb-4" style={textStyle}>Eventos Registrados</h3>
          
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

export default LoggedEvents;
