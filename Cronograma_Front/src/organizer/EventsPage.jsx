// src/pages/EventsPage.jsx
import React, { useState } from "react";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CreateEventModal from "../components/CreateEventModal";

import { useNavigate } from 'react-router-dom';

function EventsPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dummyEvents = [
  {
    image: "https://i.pinimg.com/736x/3b/cf/6f/3bcf6fb3eef53f6047632232cf1ce238.jpg",
    title: "Conferencia React",
    description: "Charla sobre ReactJS moderna.",
    dotColor: "#FF6B6B",
    eventType: "Conferencia",
    duration: 2,
    schedule: "10:00 - 12:00",
    startDate: "2025-08-01",
    endDate: "2025-08-01",
    location: "Auditorio Central",
    organizer: "Laura Gómez",
  },
  {
    image: "https://i.pinimg.com/736x/ea/b7/b6/eab7b65577d4537a2132cd743ed799db.jpg",
    title: "Hackathon 2025",
    description: "48 horas de desarrollo sin descanso.",
    dotColor: "#B983FF",
    eventType: "Competencia",
    duration: 48,
    schedule: "18:00 - 18:00",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    location: "Salón de Tecnología",
    organizer: "Equipo DevX",
  },
  {
    image: "https://i.pinimg.com/736x/64/83/cf/6483cf2f60c0a0abf646a087fecc4cb6.jpg",
    title: "Feria de Ciencias",
    description: "Proyectos innovadores escolares.",
    dotColor: "#FFE066",
    eventType: "Exposición",
    duration: 6,
    schedule: "09:00 - 15:00",
    startDate: "2025-10-05",
    endDate: "2025-10-05",
    location: "Gimnasio Escolar",
    organizer: "Prof. Ramírez",
  },
];


const containerStyle = {
    minHeight: '100vh',
    background: '#2a2a2e',
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  };

  const navigate = useNavigate();


  const goToAbout = () => {
    navigate('/about');
  };

  


const userRole = "organizador"; // organizador - usuario


  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
      <div className="container text-white py-5">
        <h1 className="text-center mb-4">Mis Eventos</h1>

        {/* Search bar */}
        <SearchBar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => setShowModal(true)}
          showAddButton={userRole === "organizador"}
        />

<CreateEventModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onRegister={() => {
    // Aquí puedes capturar datos reales del formulario si haces lifting state
    console.log("Evento registrado");
    setShowModal(false);
  }}
/>

        {/* Event Cards */}
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {dummyEvents
            .filter(event =>
              event.title.toLowerCase().includes(search.toLowerCase()) ||
              event.description.toLowerCase().includes(search.toLowerCase())
            )
            .map((event, idx) => (
              <EventCard
  key={idx}
  {...event}
  onClick={() => navigate('/organizer/calendar', { state: event })}
/>

          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
