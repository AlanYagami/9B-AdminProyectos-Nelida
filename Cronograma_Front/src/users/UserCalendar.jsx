import { useLocation } from 'react-router-dom';
import Calendar from '../components/calendar/Calendar';

function UserCalendar() {

  const location = useLocation();
  const event = location.state;

  return (
    <Calendar role="user" event={event} />
  );
}

export default UserCalendar;
