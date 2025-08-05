// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../users/Home';
import About from './../pages/About';
import Login from './../auth/Login';
import Register from './../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import EventLandingPage from './../pages/LandingPage';
import Error404Page from './../pages/Error404Page';
import Error500Page from './../pages/Error500Page';
import LoggedEvents from '../admin/LoggedEvents';
import OrganizersList from '../admin/OrganizersList';
import EventsPage from '../organizer/EventsPage';
import OrganizerCalendar from '../organizer/OrganizerCalendar';
import HistoryEvents from '../organizer/HistoryEvents';
import UserCalendar from '../users/UserCalendar';
import QRModal from './../components/QR/QRModal'
import CronogramaPage from './../components/CronogramaPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<EventLandingPage />} /> 
        <Route path="/landing" element={<EventLandingPage />} />
        <Route path="/about" element={<About />} />

        {/* Autentificación  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin */}
        <Route path="/admin/logged-events" element={<LoggedEvents />} />
        <Route path="/admin/organizers-list" element={<OrganizersList />} />

        {/* Organizadores */}
        <Route path="/organizer/my-events" element={<EventsPage />} />
        <Route path="/organizer/calendar" element={<OrganizerCalendar />} />
        <Route path="/organizer/History" element={<HistoryEvents />} />

        {/* Usuario */}
        <Route path="/home" element={<Home />} />
        <Route path="/user/calendar" element={<UserCalendar />} />

        {/* Error */}
        <Route path="*" element={<Error404Page />} />
        <Route path="/500" element={<Error500Page />} />

        {/* QR Code Page */}
        <Route path="/qr" element={<QRModal />} />
        <Route path="/cronograma" element={<CronogramaPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
