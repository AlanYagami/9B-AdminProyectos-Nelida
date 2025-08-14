import React, { useState, useEffect } from 'react';
import { formatDateKey } from '../../utils/dateHelpers';
import QRModal from './../QR/QRModal';

function MiniCalendar({ selectedDate, setSelectedDate, setCurrentWeek, events, event, color = '#764BA2', onDownloadPDF }) {
  const [showQRModal, setShowQRModal] = useState(false);

  const handleShowQR = () => {
    localStorage.setItem('eventoQR', JSON.stringify(event));
    localStorage.setItem('cronogramaQR', JSON.stringify(events));
    setShowQRModal(true);
  };

  const dayNames = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();

    const days = [];

    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    while (days.length < 42) {
      const nextDate = new Date(year, month + 1, days.length - lastDay.getDate() - startingDay + 1);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const purple = '#764BA2';
  const btnColor = { backgroundColor: purple, color: 'white' };
  const monthDays = getMonthDays(selectedDate);

  const todayKey = formatDateKey(new Date());

  // Ordenar los eventos de hoy por hora ascendente
  const todayEvents = Object.values(events)
    .filter(e => formatDateKey(e.date) === todayKey)
    .sort((a, b) => {
      const hourA = parseInt(a.time.split(':')[0], 10);
      const hourB = parseInt(b.time.split(':')[0], 10);
      return hourA - hourB;
    });

  // Estado interno para el título del evento
  const [eventTitle, setEventTitle] = useState(event?.nombreEvento || 'Sin evento seleccionado');

  // Actualizar título cuando cambie el prop event
  useEffect(() => {
    if (event?.title) {
      setEventTitle(event.title);
    }
  }, [event]);

  return (
    <div className="col-12 col-md-3 bg-dark p-3 border-end border-secondary d-flex flex-column mb-4 mb-md-0 flex-shrink-0" style={{ maxHeight: '100vh' }}>
      {/* Botones en una misma fila */}
      <div className="d-flex mb-3">
        <button
          className="btn me-2"
          style={btnColor}
          onClick={() => window.history.back()}
        >
          Regresar
        </button>
        <button
          className="btn btn-outline-light me-2"
          onClick={() => onDownloadPDF()}
        >
          Descargar
        </button>
        <button
          className="btn btn-outline-light"
          onClick={handleShowQR}
        >
          QR
        </button>
      </div>

      <QRModal
        show={showQRModal}
        onClose={() => setShowQRModal(false)}
        eventoId={event?.id}
      />

      {/* Título del evento (fuera del scroll) */}
      <h4 className="mb-4 text-white text-truncate">{eventTitle}</h4>

      {/* Contenedor con scroll para calendario y eventos */}
      <div style={{ overflowY: 'auto', flexGrow: 1, minWidth: '260px' }}>
        {/* Calendario */}
        <div className="card bg-secondary bg-opacity-10 border-0 p-3 mb-4 rounded text-white">
          <div className="d-flex justify-content-between align-items-center mb-3 px-2">
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setSelectedDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}
            >
              ‹
            </button>
            <h6 className="mb-0 text-light text-center flex-grow-1">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h6>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setSelectedDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}
            >
              ›
            </button>
          </div>

          {/* Días de la semana */}
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {dayNames.map((day, i) => (
              <div key={i} className="text-center small text-light mb-1">{day}</div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {monthDays.map((day, i) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              return (
                <button
                  key={i}
                  className="btn btn-sm w-100"
                  style={{
                    ...(day.isCurrentMonth
                      ? (isToday ? btnColor : { borderColor: 'white', color: 'white' })
                      : { color: '#888', border: 'none' }),
                    fontSize: '12px',
                    padding: '4px 0',
                    minHeight: '36px',
                    height: '100%',
                  }}
                  onClick={() => {
                    setSelectedDate(day.date);
                    setCurrentWeek(day.date);
                  }}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de eventos de hoy */}
        {todayEvents.length > 0 && (
          <div className="mt-4">
            <h6 className="text-white mb-3">HOY</h6>
            <div>
              {todayEvents.map((event) => (
                <div key={`${formatDateKey(event.date)}-${event.time}`} className="mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: event.color || color,
                      }}
                    ></div>
                    <div className="text-white text-truncate" style={{ fontSize: '0.875rem' }}>
                      <strong>{event.time}</strong> - {event.title}
                    </div>
                  </div>
                  {event.description && (
                    <div className="text-light small ms-4 text-truncate" title={event.description}>
                      {event.description.slice(0, 80)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniCalendar;