import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CreateEventModal from "../components/CreateEventModal";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EventsPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [tiposEvento, setTiposEvento] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userRole = localStorage.getItem("role") || "Sin rol";
  const username = localStorage.getItem("username") || "Sin nombre";

  // Cargar eventos y tipos de eventos
  const fetchEventos = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      // Cargar eventos del usuario
      const response = await api.eventos.getByUser(userId);
      setEventos(response.data.filter(
        (ev) => new Date(ev.fechaFin) > new Date()
      ));

      // Cargar lista completa de tipos de evento
      const tiposResponse = await api.tipoEvento.getAll();
      setTiposEvento(tiposResponse.data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      setEventos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Registrar un nuevo evento
  const handleRegisterEvent = async (eventoData) => {
    try {
      await api.eventos.create(eventoData);
      await fetchEventos();
      setShowModal(false);
    } catch (error) {
      console.error("Error al registrar evento:", error);
    }
  };




  // Fetch inicial de eventos y tipos
  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#2a2a2e" }}>
      <Sidebar onLogout={logout} role={userRole} username={username} />

      <div className="flex-grow-1 text-white py-4 px-3" style={{ marginLeft: "0", marginTop: "56px" }}>
        <div className="d-none d-md-block" style={{ height: "1px", marginLeft: "240px" }}></div>

        <h1 className="text-center mb-4">Mis Eventos Activos</h1>

        <SearchBar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => setShowModal(true)}
          showAddButton={userRole === "role_organizador"}
        />

        <CreateEventModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onRegister={handleRegisterEvent}
        />

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
                // Busca el nombre del tipo de evento
                const tipoEventoId = event.tipoEvento?.idTipoEvento;
                const tipoNombre = tiposEvento.find(t => t.idTipoEvento === tipoEventoId)?.tipoEvento || "Sin tipo";

                return (
                  <EventCard
                    key={event.idEvento || idx}
                    title={event.nombreEvento || "Evento sin nombre"}
                    description={event.descripcionEvento || "Sin descripción"}
                    location={event.ubicacion || "Sin ubicación"}
                    startDate={event.fechaInicio?.split("T")[0]}
                    endDate={event.fechaFin?.split("T")[0]}
                    schedule={`${event.fechaInicio?.split("T")[1]?.slice(0, 5)} - ${event.fechaFin?.split("T")[1]?.slice(0, 5)}`}
                    duration={Math.ceil(
                      (new Date(event.fechaFin) - new Date(event.fechaInicio)) / 3600000
                    )}
                    organizer={event.responsable}
                    eventType={tipoNombre}
                    onClick={() => navigate("/organizer/calendar", { state: event })}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
