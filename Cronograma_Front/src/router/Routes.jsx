// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../pages/Home';
import About from './../pages/About';
import Login from './../auth/Login';
import Register from './../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import EventLandingPage from './../pages/LandingPage';
import Error404Page from './../pages/Error404Page';
import Error500Page from './../pages/Error500Page';
import LoggedEvents from '../admin/LoggedEvents';
import OrganizersList from '../admin/OrganizersList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<EventLandingPage />} />
        <Route path="/home" element={<Home />} />
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
        
        {/* Error */}
        <Route path="*" element={<Error404Page />} />
        <Route path="/500" element={<Error500Page />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
