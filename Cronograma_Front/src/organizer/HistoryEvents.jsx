import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../components/HistoryCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function HistoryEvents() {
  const [search, setSearch] = useState("");
  const [eventos, setEventos] = useState([]);
  const [tiposEvento, setTiposEvento] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userRole = localStorage.getItem("role") || "Sin rol";
  const username = localStorage.getItem("username") || "Sin nombre";

  const fetchEventos = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      // Obtener eventos
      const response = await api.eventos.getByUser(userId);
      const eventosHistorial = response.data.filter(
        (ev) => new Date(ev.fechaFin) < new Date()
      );
      setEventos(eventosHistorial);

      // Obtener tipos de evento
      const tiposResponse = await api.tipoEvento.getAll();
      setTiposEvento(tiposResponse.data);
    } catch (error) {
      console.error("Error al cargar historial:", error);
      setEventos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#2a2a2e" }}>
      <Sidebar onLogout={logout} role={userRole} username={username} />

      <div className="flex-grow-1 text-white py-4 px-3" style={{ marginTop: "56px" }}>
        <h1 className="text-center mb-4">Historial de Eventos</h1>

        <SearchBar
          searchValue={search}
          onSearchChange={setSearch}
          showAddButton={false}
        />

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {isLoading ? (
            <p className="text-white text-center">Cargando historial...</p>
          ) : eventos.length === 0 ? (
            <p className="text-white text-center">No hay eventos en el historial.</p>
          ) : (
            eventos
              .filter(event =>
                event.nombreEvento.toLowerCase().includes(search.toLowerCase())
              )
              .map((event, idx) => {
                const tipoNombre =
                  event.tipoEvento?.tipoEvento || // si backend devuelve el objeto
                  tiposEvento.find(t => t.idTipoEvento === event.idTipoEvento)?.tipoEvento || // si solo viene id
                  "Sin tipo";

                return (
                  <HistoryCard
                    key={event.idEvento || idx}
                    title={event.nombreEvento}
                    eventType={tipoNombre}
                    duration={Math.ceil(
                      (new Date(event.fechaFin) - new Date(event.fechaInicio)) / 3600000
                    )}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryEvents;