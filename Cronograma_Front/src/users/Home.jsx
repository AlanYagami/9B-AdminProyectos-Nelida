import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from 'react-router-dom';
import api from "./../services/api";

function Home() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [tiposEvento, setTiposEvento] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const containerStyle = {
    minHeight: '100vh',
    background: '#2a2a2e',
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  };

  const userRole = "usuario";

  const fetchEventos = async () => {
    try {
      const response = await api.publico.getEventosPublicos();
      setEventos(response.data.filter(
        (ev) => new Date(ev.fechaFin) > new Date()
      ));

      const tiposResponse = await api.publico.getTiposEventosPublico();
      setTiposEvento(tiposResponse.data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      setEventos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
      <div className="flex-grow-1 text-white py-4 px-3" style={{ marginLeft: "0", marginTop: "56px" }}>
        <div className="container text-white py-5">
          <h1 className="text-center mb-4">Eventos Disponibles</h1>

          {/* Search bar */}
          <SearchBar
            searchValue={search}
            onSearchChange={setSearch}
            onAddClick={() => console.log("Agregar evento")}
            showAddButton={userRole === "organizador"}
          />

          {/* Event Cards */}
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {isLoading ? (
              <p className="text-white text-center">Cargando eventos...</p>
            ) : eventos.length === 0 ? (
              <p className="text-white text-center">No hay eventos registrados.</p>
            ) : (
              eventos
                .filter(event =>
                  event.nombreEvento.toLowerCase().includes(search.toLowerCase()) ||
                  event.descripcionEvento.toLowerCase().includes(search.toLowerCase()) ||
                  event.tipoEvento?.tipoEvento.toLowerCase().includes(search.toLowerCase()) ||
                  event.responsable.toLowerCase().includes(search.toLowerCase()) ||
                  event.ubicacion.toLowerCase().includes(search.toLowerCase())
                )
                .map((event, idx) => {
                  const tipoEventoId = event.tipoEvento?.idTipoEvento;
                  const tipoNombre = tiposEvento.find(t => t.idTipoEvento === tipoEventoId)?.tipoEvento || "Sin tipo";

                  const startDate = event.fechaInicio?.split("T")[0];
                  const endDate = event.fechaFin?.split("T")[0];
                  const schedule = `${event.fechaInicio?.split("T")[1]?.slice(0, 5)} - ${event.fechaFin?.split("T")[1]?.slice(0, 5)}`;
                  const duration = Math.ceil(
                    (new Date(event.fechaFin) - new Date(event.fechaInicio)) / 3600000
                  );

                  return (
                    <EventCard
                      key={event.idEvento || idx}
                      title={event.nombreEvento || "Evento sin nombre"}
                      description={event.descripcionEvento || "Sin descripción"}
                      location={event.ubicacion || "Sin ubicación"}
                      startDate={startDate}
                      endDate={endDate}
                      schedule={schedule}
                      duration={duration}
                      organizer={event.responsable}
                      eventType={tipoNombre}
                      onClick={() => navigate('/user/calendar', { state: event })}
                    />
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
