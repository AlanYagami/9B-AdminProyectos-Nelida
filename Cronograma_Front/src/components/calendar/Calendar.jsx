import { useState } from 'react';
import MiniCalendar from './MiniCalendar';
import WeekHeader from './WeekHeader';
import TimeGrid from './TimeGrid';
import EventModal from './EventModal';
import { formatDateKey } from '../../utils/dateHelpers';
import { generarPDF } from './../../utils/pdfUtils';
import { colorMap } from './../../data/colors';

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
        onDownloadPDF={() => generarPDF(event, events)}
      />
    </div>
  );
}

export default Calendar;
