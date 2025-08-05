// src/pages/EventsPage.jsx
import { useState } from "react";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from 'react-router-dom';

import data from "./../data/events";

function Home() {
  const [search, setSearch] = useState("");

const containerStyle = {
    minHeight: '100vh',
    background: '#2a2a2e',
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  };

  const navigate = useNavigate();

  const userRole = "usuario"; // organizador - usuario

  return (
    <div className="d-flex" style={containerStyle}>
      <Sidebar />
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
          {data
            .filter(event =>
              event.title.toLowerCase().includes(search.toLowerCase()) ||
              event.description.toLowerCase().includes(search.toLowerCase())
            )
            .map((event, idx) => (
              <EventCard
                key={idx}
                {...event}
                onClick={() => navigate('/user/calendar', { state: event })}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
