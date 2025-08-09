// src/router/Router.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './../auth/Login';
import Register from './../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import EventLandingPage from './../pages/LandingPage';
import About from './../pages/About';
import Home from './../users/Home';
import UserCalendar from '../users/UserCalendar';
import LoggedEvents from '../admin/LoggedEvents';
import OrganizersList from '../admin/OrganizersList';
import EventsPage from '../organizer/EventsPage';
import OrganizerCalendar from '../organizer/OrganizerCalendar';
import HistoryEvents from '../organizer/HistoryEvents';
import Error404Page from './../pages/Error404Page';
import Error500Page from './../pages/Error500Page';
import ProtectedRoute from './ProtectedRoute';

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

      {/* Admin */}
      <Route path="/admin/logged-events" element={<ProtectedRoute allowedRoles={['role_admin']}><LoggedEvents /></ProtectedRoute>}/>
      <Route path="/admin/organizers-list" element={<ProtectedRoute allowedRoles={['role_admin']}><OrganizersList /></ProtectedRoute>}/>

      {/* Organizador */}
      <Route path="/organizer/my-events" element={<ProtectedRoute allowedRoles={['role_organizador']}><EventsPage /></ProtectedRoute>}/>
      <Route path="/organizer/calendar" element={<ProtectedRoute allowedRoles={['role_organizador']}><OrganizerCalendar /></ProtectedRoute>}/>
      <Route path="/organizer/History" element={ <ProtectedRoute allowedRoles={['role_organizador']}><HistoryEvents /></ProtectedRoute>}/>

      {/* Usuario */}
      <Route path="/home" element={<ProtectedRoute allowedRoles={['role_user']}><Home /></ProtectedRoute>}/>
      <Route path="/user/calendar"element={<ProtectedRoute allowedRoles={['role_user']}><UserCalendar /></ProtectedRoute>}/>

      {/* Error */}
      <Route path="*" element={<Error404Page />} />
      <Route path="/500" element={<Error500Page />} />
    </Routes>
  );
}

export default Router;