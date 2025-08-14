import { useState, useEffect } from 'react';
import MiniCalendar from './MiniCalendar';
import WeekHeader from './WeekHeader';
import TimeGrid from './TimeGrid';
import EventModal from './EventModal';
import { formatDateKey } from '../../utils/dateHelpers';
import { generarPDF } from './../../utils/pdfUtils';
import { colorMap } from './../../data/colors';
import api from '../../services/api';

function Calendar({ role = 'user', event }) {
  const isOrganizer = role === 'role_organizador';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);

  const selectedColorHex = colorMap[eventColor] || '#757575';

  const fetchBloques = async () => {
    try {
      let response;
      if (event?.idEvento) {
        response = await api.bloques.getByEvento(event.idEvento);
      } else {
        response = await api.bloques.getAll();
      }

      const bloques = response.data;
      const formatted = {};

      bloques.forEach(b => {
        const fechaBloque = new Date(b.fechaBloque); // ← camelCase
        const horaInicio = b.horaInicio.slice(0, 5); // ← camelCase
        const key = `${formatDateKey(fechaBloque)}-${horaInicio}`;

        formatted[key] = {
          title: b.nombreBloque, // ← camelCase
          description: b.descripcion,
          color: colorMap[b.color] || '#757575',
          date: fechaBloque,
          time: horaInicio
        };
      });

      setEvents(formatted);
    } catch (error) {
      console.error('Error al cargar bloques:', error);
      setEvents({});
    }
  };


  useEffect(() => {
    fetchBloques();
  }, [event]);

  const handleSlotClick = (date, time) => {
    setSelectedSlot({ date, time });
    setEventTitle('');
    setEventDescription('');
    setEventColor('');
    setShowEventModal(true);
  };

  const handleClose = () => {
    setShowEventModal(false);
    setSelectedSlot(null);
  };

  const handleDownloadPDF = () => {
    generarPDF(event, events);
  };

  const handleSubmit = async () => {
    if (eventTitle.trim() && selectedSlot) {
      const newBloque = {
        color: eventColor,
        descripcion: eventDescription,
        fechaBloque: selectedSlot.date,
        horaInicio: selectedSlot.time + ':00',
        horaFin: '', // aquí podrías calcular o pedir
        nombreBloque: eventTitle,
        idEvento: event?.idEvento || 1
      };

      try {
        await api.bloques.create(newBloque);
        await fetchBloques(); // recarga después de insertar
      } catch (error) {
        console.error('Error al crear bloque:', error);
      }

      handleClose();
    }
  };


  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row flex-column flex-md-row">
        <MiniCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentWeek={setCurrentWeek}
          events={events}
          event={event}
          color={selectedColorHex}
          onDownloadPDF={() => generarPDF(event, events)}
        />

        <div className="col-md-9 p-0">
          <WeekHeader
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
          <TimeGrid
            currentWeek={currentWeek}
            events={events}
            onSlotClick={handleSlotClick}
          />
        </div>
      </div>

      <EventModal
        show={showEventModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventColor={eventColor}
        setEventColor={setEventColor}
        colors={Object.keys(colorMap)}
        selectedSlot={selectedSlot}
        isEditable={isOrganizer}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
}

export default Calendar;
