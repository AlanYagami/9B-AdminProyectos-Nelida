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
        <Route path="*" element={<Error404Page />} />

        {/* Error 500 */}
        <Route path="/500" element={<Error500Page />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
