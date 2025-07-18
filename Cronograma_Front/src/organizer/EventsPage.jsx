// src/pages/EventsPage.jsx
import React, { useState } from "react";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";

import { useNavigate } from 'react-router-dom';

function EventsPage() {
  const [search, setSearch] = useState("");
  const dummyEvents = [
  {
    image: "https://i.pinimg.com/736x/3b/cf/6f/3bcf6fb3eef53f6047632232cf1ce238.jpg",
    title: "Busqueda",
    description: "descripcion",
    dotColor: "#FF6B6B",
  },
  {
    image: "https://i.pinimg.com/736x/ea/b7/b6/eab7b65577d4537a2132cd743ed799db.jpg",
    title: "XD",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.",
    dotColor: "#B983FF",
  },
  {
    image: "https://i.pinimg.com/736x/3b/cf/6f/3bcf6fb3eef53f6047632232cf1ce238.jpg",
    title: "Sed ut perspiciatis",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.",
    dotColor: "#FFE066",
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

  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
      <div className="container text-white py-5">
        <h1 className="text-center mb-4">Eventos</h1>

        {/* Search bar */}
        <div className="d-flex justify-content-center mb-5">
          <div className="input-group w-50">
            <span className="input-group-text bg-dark border-secondary text-white">

            </span>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Nombre del evento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-success" type="button">
              +
            </button>
          </div>
        </div>

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
