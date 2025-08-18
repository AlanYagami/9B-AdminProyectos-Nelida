// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../users/Home';
import About from './../pages/About';
import Login from './../auth/Login';
import Register from './../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
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
import ProtectedRoute from './ProtectedRoute';
import EventList from './../organizer/EventList';

function Router() {
  return (
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<EventLandingPage />} />
        <Route path="/landing" element={<EventLandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/qr" element={<QRModal />} />
        <Route path="/cronograma" element={<CronogramaPage />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/user/calendar"element={<UserCalendar />}/>

        {/* Admin */}
        <Route path="/admin/logged-events" element={<ProtectedRoute allowedRoles={['role_admin']}><LoggedEvents /></ProtectedRoute>}/>
        <Route path="/admin/organizers-list" element={<ProtectedRoute allowedRoles={['role_admin']}><OrganizersList /></ProtectedRoute>}/>

        {/* Organizador */}
        <Route path="/organizer/my-events" element={<ProtectedRoute allowedRoles={['role_organizador']}><EventsPage /></ProtectedRoute>}/>
        <Route path="/organizer/calendar" element={<ProtectedRoute allowedRoles={['role_organizador']}><OrganizerCalendar /></ProtectedRoute>}/>
        <Route path="/organizer/History" element={ <ProtectedRoute allowedRoles={['role_organizador']}><HistoryEvents /></ProtectedRoute>}/>
        <Route path="/organizer/event-list" element={<ProtectedRoute allowedRoles={['role_organizador']}><EventList /></ProtectedRoute>} />

        {/* Error */}
        <Route path="*" element={<Error404Page />} />
        <Route path="/500" element={<Error500Page />} />
      </Routes>
  );
}

export default Router;
