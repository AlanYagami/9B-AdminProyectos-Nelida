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
  const [editingBlock, setEditingBlock] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const selectedColorHex = colorMap[eventColor] || '#757575';

    const fetchBloques = async () => {
      try {
        let response;
        if (isOrganizer) {
          response = event?.idEvento
            ? await api.bloques.getByEvento(event.idEvento)
            : await api.bloques.getAll();
        } else {
          response = event?.idEvento
            ? await api.publico.getBloquesPublicosByEvento(event.idEvento)
            : { data: [] };
        }

        const bloques = response.data;
        const formatted = {};

        bloques.forEach(b => {
          const fechaBloque = new Date(b.fechaBloque);
          const horaInicio = b.horaInicio.slice(0, 5);
          const key = `${formatDateKey(fechaBloque)}-${horaInicio}`;

          formatted[key] = {
            idBloque: b.idBloque,
            title: b.nombreBloque,
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

  const openModalForSlot = (date, time) => {
    const key = `${formatDateKey(date)}-${time}`;
    const existingEvent = events[key];

    if (existingEvent) {
      // Modo edición
      setEventTitle(existingEvent.title);
      setEventDescription(existingEvent.description);
      setEventColor(Object.keys(colorMap).find(c => colorMap[c] === existingEvent.color) || '');
      setEditingBlock({ idBloque: existingEvent.idBloque });
    } else {
      // Nuevo
      setEventTitle('');
      setEventDescription('');
      setEventColor('');
      setEditingBlock(null);
    }

    setSelectedSlot({ date, time });
    setShowEventModal(true);
  };

  const handleClose = () => {
    setShowEventModal(false);
    setSelectedSlot(null);
    setEditingBlock(null);
  };

  const handleDownloadPDF = () => {
    generarPDF(event, events);
  };

  const handleSubmit = async () => {
    if (!eventTitle.trim() || !eventColor || !selectedSlot) return;

    const payload = {
      nombreBloque: eventTitle,
      descripcion: eventDescription,
      color: eventColor,
      fechaBloque: selectedSlot.date.toISOString(),
      horaInicio: selectedSlot.time + ':00',
      evento: { idEvento: event?.idEvento || 1 }
    };

    try {
      if (editingBlock) {
        await api.bloques.update(editingBlock.idBloque, payload);
      } else {
        await api.bloques.create(payload);
      }
      await fetchBloques();
      handleClose();
    } catch (error) {
      console.error('Error al guardar bloque:', error);
    }
  };

  const handleDelete = async () => {
    if (!editingBlock) return;
    try {
      await api.bloques.delete(editingBlock.idBloque);
      await fetchBloques();
      handleClose();
    } catch (error) {
      console.error('Error al eliminar bloque:', error);
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
          onDownloadPDF={handleDownloadPDF}
        />

        <div className="col-md-9 p-0">
          <WeekHeader
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
          <TimeGrid
            currentWeek={currentWeek}
            events={events}
            onSlotClick={openModalForSlot}
          />
        </div>
      </div>

      <EventModal
        show={showEventModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
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
        editingBlock={editingBlock}
      />
    </div>
  );
}

export default Calendar;