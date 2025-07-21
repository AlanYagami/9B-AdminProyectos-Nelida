import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);

  // Generar horas del día
  const timeSlots = [];
  for (let i = 7; i <= 17; i++) {
    timeSlots.push(`${i}:00`);
  }

  // Obtener días de la semana actual
  const getWeekDays = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const weekDays = getWeekDays(currentWeek);

  // Obtener días del mes para el calendario lateral
  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Días del siguiente mes
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const monthDays = getMonthDays(selectedDate);

  // Formatear fecha
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Manejar clic en slot de tiempo
  const handleSlotClick = (date, time) => {
    setSelectedSlot({ date, time });
    setShowEventModal(true);
  };

  // Crear evento
  const handleCreateEvent = () => {
    if (eventTitle.trim() && selectedSlot) {
      const dateKey = formatDateKey(selectedSlot.date);
      const timeKey = selectedSlot.time;
      const eventKey = `${dateKey}-${timeKey}`;
      
      setEvents(prev => ({
        ...prev,
        [eventKey]: {
          title: eventTitle,
          date: selectedSlot.date,
          time: selectedSlot.time
        }
      }));
      
      setEventTitle('');
      setShowEventModal(false);
      setSelectedSlot(null);
    }
  };

  // Obtener evento para un slot específico
  const getEventForSlot = (date, time) => {
    const dateKey = formatDateKey(date);
    const eventKey = `${dateKey}-${time}`;
    return events[eventKey];
  };

  // Navegar semana
  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  // Navegar mes
  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

  return (
    <div className="container-fluid bg-dark text-white" style={{ minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark p-3" style={{ borderRight: '1px solid #444' }}>
          <h4 className="mb-4">Nombre Evento</h4>
          
          {/* Mini Calendar */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button 
                className="btn btn-sm btn-outline-light"
                onClick={() => navigateMonth(-1)}
              >
                ‹
              </button>
              <h6 className="mb-0">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h6>
              <button 
                className="btn btn-sm btn-outline-light"
                onClick={() => navigateMonth(1)}
              >
                ›
              </button>
            </div>
            
            <div className="row text-center mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div key={index} className="col text-muted small">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="row">
              {monthDays.map((day, index) => (
                <div key={index} className="col p-1">
                  <button
                    className={`btn btn-sm w-100 ${
                      day.isCurrentMonth 
                        ? (day.date.toDateString() === new Date().toDateString() 
                           ? 'btn-primary' 
                           : 'btn-outline-light') 
                        : 'btn-link text-muted'
                    }`}
                    style={{ fontSize: '12px', padding: '2px' }}
                    onClick={() => {
                      setSelectedDate(day.date);
                      setCurrentWeek(day.date);
                    }}
                  >
                    {day.date.getDate()}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Events */}
          <div>
            <h6 className="mb-3">HOY</h6>
            <div className="text-muted small">
              55°/40° ☀️
            </div>
            <div className="mt-3">
              {Object.values(events)
                .filter(event => formatDateKey(event.date) === formatDateKey(new Date()))
                .map((event, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div className="bg-primary rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                    <div>
                      <div className="small">{event.time}</div>
                      <div className="small text-muted">{event.title}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Main Calendar */}
        <div className="col-md-9 p-0">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-light me-2"
                onClick={() => navigateWeek(-1)}
              >
                ‹
              </button>
              <button 
                className="btn btn-outline-light me-3"
                onClick={() => navigateWeek(1)}
              >
                ›
              </button>
              <h5 className="mb-0">
                {monthNames[currentWeek.getMonth()]} {currentWeek.getFullYear()}
              </h5>
            </div>
            <div className="small text-muted">
              EST GMT-5
            </div>
          </div>

          {/* Week Header */}
          <div className="row mx-0 border-bottom border-secondary">
            <div className="col-1 p-2"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="col p-2 text-center border-start border-secondary">
                <div className="small text-muted">{dayNames[day.getDay()]}</div>
                <div className={`h5 ${day.toDateString() === new Date().toDateString() ? 'text-primary' : ''}`}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="row mx-0 border-bottom border-secondary" style={{ minHeight: '60px' }}>
                <div className="col-1 p-2 text-end border-end border-secondary">
                  <small className="text-muted">{time}</small>
                </div>
                {weekDays.map((day, dayIndex) => {
                  const event = getEventForSlot(day, time);
                  return (
                    <div 
                      key={dayIndex} 
                      className={`col p-1 border-start border-secondary position-relative ${
                        event ? 'bg-primary bg-opacity-25' : ''
                      }`}
                      style={{ 
                        cursor: 'pointer',
                        minHeight: '60px'
                      }}
                      onClick={() => handleSlotClick(day, time)}
                    >
                      {event && (
                        <div className="bg-primary text-white rounded p-1 small">
                          <div className="fw-bold">{event.time}</div>
                          <div>{event.title}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Event Modal */}
      {showEventModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Crear Evento</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowEventModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label small text-muted">
                    Fecha: {selectedSlot?.date && formatDate(selectedSlot.date)}
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted">
                    Hora: {selectedSlot?.time}
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Título del Evento</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Ingresa el título del evento"
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer border-secondary">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEventModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleCreateEvent}
                >
                  Crear Evento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;