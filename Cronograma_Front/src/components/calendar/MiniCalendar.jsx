import React, { useState, useEffect } from 'react';
import { formatDateKey } from '../../utils/dateHelpers';

import QRModal from './../QR/QRModal';
import Swal from 'sweetalert2';

function MiniCalendar({ selectedDate, setSelectedDate, setCurrentWeek, events, event, color = '#764BA2', onDownloadPDF }) {
  const [showQRModal, setShowQRModal] = useState(false);

  // Función para validar disponibilidad del QR
  const validarDisponibilidad = event => {
    if (!event) return { valido: false };
    const ahora = new Date();
    const fechaEvento = new Date(event.fechaInicio);
    const diaEvento = fechaEvento.toDateString();
    const hoy = ahora.toDateString();

    if (hoy !== diaEvento) return {
      valido: false,
      alerta: {
        icon: 'warning',
        title: 'QR no disponible',
        text: 'Solo puedes acceder al QR el día del evento.',
      },
    };

    const fechaHoraInicio = new Date(`${event.fechaInicio.split('T')[0]}T${event.horaInicio}`);
    const fechaHoraFin = new Date(`${event.fechaInicio.split('T')[0]}T${event.horaFin}`);
    const dosHorasAntes = new Date(fechaHoraInicio.getTime() - 2 * 60 * 60 * 1000);

    if (ahora < dosHorasAntes) {
      const msRestantes = dosHorasAntes - ahora;
      const horas = Math.floor(msRestantes / (1000 * 60 * 60));
      const minutos = Math.ceil((msRestantes % (1000 * 60 * 60)) / (1000 * 60));
      return {
        valido: false,
        alerta: {
          icon: 'info',
          title: 'Aún no disponible',
          text: `Puedes acceder al QR solo 2 horas antes del evento. Faltan aproximadamente ${horas}h ${minutos}min.`,
        },
      };
    }

    if (ahora > fechaHoraFin) return {
      valido: false,
      alerta: {
        icon: 'error',
        title: 'Evento finalizado',
        text: 'El evento ya ha terminado. El QR ya no está disponible.',
      },
    };

    return { valido: true };
  };

  const handleShowQR = () => {
    const resultado = validarDisponibilidad(event);
    if (!resultado.valido && resultado.alerta) {
      Swal.fire(resultado.alerta);
      return;
    }
    setShowQRModal(true);
  };

  const handleDownloadPDF = () => onDownloadPDF();

  // Utilidades para el calendario
  const dayNames = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const getMonthDays = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay(); // 0 DOM, 1 LUN, ...
    const days = [];

    // Días previos al mes
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }

    // Días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Días posteriores para completar la grilla
    while (days.length < 42) {
      const nextDate = new Date(year, month + 1, days.length - lastDay.getDate() - startingDay + 1);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const purple = '#764BA2';
  const btnColor = { backgroundColor: purple, color: 'white' };
  const monthDays = getMonthDays(selectedDate);

  const today = new Date();
  const todayKey = formatDateKey(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  // Eventos filtrados y ordenados
  const allEvents = Object.values(events);
  const todayEvents = allEvents.filter(e => formatDateKey(e.date) === todayKey)
                              .sort((a, b) => parseInt(a.time) - parseInt(b.time));

  const tomorrowEvents = allEvents.filter(e => formatDateKey(e.date) === tomorrowKey)
                                 .sort((a, b) => parseInt(a.time) - parseInt(b.time));

  const [eventTitleDisplay, setEventTitleDisplay] = useState(event?.nombreEvento || 'Sin evento seleccionado');
  const [fechaInicio, setFechaInicio] = useState(event?.fechaInicio || 'Sin fecha inicio');
  const [fechaFin, setFechaFin] = useState(event?.fechaFin || 'Sin fecha fin');
  const [horaInicio, setHoraInicio] = useState(event?.horaInicio || 'Sin hora inicio');
  const [horaFin, setHoraFin] = useState(event?.horaFin || 'Sin hora fin');

  useEffect(() => {
    if (event?.title) {
      setEventTitleDisplay(event.title);
      setFechaInicio(event.fechaInicio);
      setFechaFin(event.fechaFin);
      setHoraInicio(event.horaInicio);
      setHoraFin(event.horaFin);
    }
  }, [event]);

  const getEndTime = startTime => {
    const hour = parseInt(startTime.split(':')[0], 10);
    return `${hour + 1}:00`;
  };

  const formatearFechaBonita = (fechaStr) => {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatearHoraBonita = (horaStr) => {
    if (!horaStr) return '';
    const [hora, minutos] = horaStr.split(':');
    return `${hora}:${minutos}`;
  };

  return (
    <div className="col-12 col-md-3 bg-dark p-3 border-end border-secondary d-flex flex-column mb-4 mb-md-0 flex-shrink-0" style={{ maxHeight: '100vh' }}>
      <div className="d-flex mb-3">
        <button className="btn me-2" style={btnColor} onClick={() => window.history.back()}>Regresar</button>
        <button className="btn btn-outline-light me-2" onClick={handleDownloadPDF}>Descargar</button>
        <button className="btn btn-outline-light" onClick={handleShowQR}>QR</button>
      </div>

      <QRModal show={showQRModal} onClose={() => setShowQRModal(false)} eventoId={event?.idEvento} />

      <h4 className="text-truncate fw-bold border-bottom pb-1" style={{ borderColor: '#764BA2' }}>
        {eventTitleDisplay}
      </h4>

      {/* Fechas */}
      <h6 className="text-truncate">
        <span style={{ color: '#c190f1ff' }}>Inicia: </span>
        <span className="text-white">{formatearFechaBonita(fechaInicio)}</span>
      </h6>
      <h6 className="text-truncate mb-2">
        <span style={{ color: '#c190f1ff' }}>Finaliza: </span>
        <span className="text-white">{formatearFechaBonita(fechaFin)}</span>
      </h6>

      {/* Horario */}
      <h6 className="text-truncate mb-4">
        <span style={{ color: '#c190f1ff' }}>Horario: </span>
        <span className="text-white">
          {formatearHoraBonita(horaInicio)} - {formatearHoraBonita(horaFin)}
        </span>
      </h6>

      <div style={{ overflowY: 'auto', flexGrow: 1, minWidth: '260px' }}>
        <div className="card bg-secondary bg-opacity-10 border-0 p-3 mb-4 rounded text-white">
          <div className="d-flex justify-content-between align-items-center mb-3 px-2">
            <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedDate(prev => { const d = new Date(prev); d.setMonth(prev.getMonth() - 1); return d; })}>‹</button>
            <h6 className="mb-0 text-light text-center flex-grow-1">{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h6>
            <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedDate(prev => { const d = new Date(prev); d.setMonth(prev.getMonth() + 1); return d; })}>›</button>
          </div>

          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {dayNames.map((day, i) => <div key={i} className="text-center small text-light mb-1">{day}</div>)}
          </div>

          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {monthDays.map((day, i) => {
              const isToday = day.date.toDateString() === today.toDateString();
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

        {/* Sección HOY */}
        <div className="mt-4">
          <h6 className="text-white mb-3">HOY ({today.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })})</h6>
          {todayEvents.length > 0 ? todayEvents.map(ev => (
            <div key={`${formatDateKey(ev.date)}-${ev.time}`} className="mb-3">
              <div className="d-flex align-items-center">
                <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: ev.color || color }}></div>
                <div className="text-white text-truncate" style={{ fontSize: '0.875rem' }}>
                  <strong>{ev.time}</strong> - <strong>{getEndTime(ev.time)}</strong> {ev.title}
                </div>
              </div>
              {ev.description && (
                <div className="text-light small ms-4 text-truncate" title={ev.description}>
                  {ev.description.slice(0, 80)}
                </div>
              )}
            </div>
          )) : (
            <div className="text-light">No hay actividades registradas para hoy.</div>
          )}
        </div>

        {/* Sección MAÑANA */}
        {tomorrowEvents.length > 0 && (
          <div className="mt-4">
            <h6 className="text-white mb-3">MAÑANA ({tomorrow.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })})</h6>
            {tomorrowEvents.map(ev => (
              <div key={`${formatDateKey(ev.date)}-${ev.time}`} className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: ev.color || color }}></div>
                  <div className="text-white text-truncate" style={{ fontSize: '0.875rem' }}>
                    <strong>{ev.time}</strong> - <strong>{getEndTime(ev.time)}</strong> {ev.title}
                  </div>
                </div>
                {ev.description && (
                  <div className="text-light small ms-4 text-truncate" title={ev.description}>
                    {ev.description.slice(0, 80)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniCalendar;