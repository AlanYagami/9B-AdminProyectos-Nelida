import { useLocation } from 'react-router-dom';
import Calendar from './../components/calendar/Calendar';

function OrganizerCalendar() {
  const location = useLocation();
  const event = location.state;

  return (
    <Calendar role="organizer" event={event} />
  );
}

export default OrganizerCalendar;