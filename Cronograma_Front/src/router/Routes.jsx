// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../pages/Home';
import About from './../pages/About';
import Login from './../auth/Login';
import Register from './../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import EventLandingPage from './../pages/LandingPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/" element={<EventLandingPage />} />
        <Route path="/landing" element={<EventLandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
