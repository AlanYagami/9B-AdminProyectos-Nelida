import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CreateEventModal from "../components/CreateEventModal";

import data from "./../data/events";

function HistoryEvents() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userRole = "organizador"; // organizador - usuario

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#2a2a2e" }}>
      <Sidebar onLogout={() => console.log("Logout")} role={userRole} username="Organizador" />

      <div
        className="flex-grow-1 text-white py-4 px-3"
        style={{
          marginLeft: "0",
          marginTop: "56px",
        }}
      >
        <div className="d-none d-md-block" style={{ height: "1px", marginLeft: "240px" }}></div>

        <h1 className="text-center mb-4">Historial</h1>

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
            console.log("Evento registrado");
            setShowModal(false);
          }}
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
                onClick={() => navigate('/organizer/calendar', { state: event })}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryEvents;
