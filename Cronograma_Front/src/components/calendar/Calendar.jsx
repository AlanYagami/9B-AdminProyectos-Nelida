import { useState } from 'react';
import MiniCalendar from './MiniCalendar';
import WeekHeader from './WeekHeader';
import TimeGrid from './TimeGrid';
import EventModal from './EventModal';
import { formatDateKey } from '../../utils/dateHelpers';

// Mapa de colores centralizado
const colorMap = {
  'Rojo': '#FF6B6B',          // rojo vibrante
  'Morado': '#764BA2',        // morado medio
  'Azul': '#45B7D1',          // azul cian claro
  'Naranja': '#F2994A',       // naranja cálido
  'Verde Lima': '#A3D900',    // verde lima brillante
  'Cian': '#00B8D9',          // cian intenso
  'Rosa Fucsia': '#FF4D94',   // rosa fuerte
  'Amarillo': '#FFC93C',      // amarillo mostaza
  'Turquesa': '#40E0D0',      // turquesa
  'Lavanda': '#B57EDC',       // lavanda suave
};

function Calendar({ role = 'user', event }) {
  const isOrganizer = role === 'organizer';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);

  const selectedColorHex = colorMap[eventColor] || '#757575';

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

  const handleSubmit = () => {
    if (eventTitle.trim() && selectedSlot) {
      const key = `${formatDateKey(selectedSlot.date)}-${selectedSlot.time}`;
      setEvents(prev => ({
        ...prev,
        [key]: {
          title: eventTitle,
          description: eventDescription,
          color: selectedColorHex,
          date: selectedSlot.date,
          time: selectedSlot.time,
        }
      }));
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
      />
    </div>
  );
}

export default Calendar;
