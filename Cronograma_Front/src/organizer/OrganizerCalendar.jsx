import { useLocation } from 'react-router-dom';
import Calendar from './../components/calendar/Calendar';

function OrganizerCalendar() {
  const location = useLocation();
  const event = location.state;
  const userRole = localStorage.getItem("role") || "Sin rol";

  return (
    <Calendar role={userRole} event={event} />
  );
}

export default OrganizerCalendar;