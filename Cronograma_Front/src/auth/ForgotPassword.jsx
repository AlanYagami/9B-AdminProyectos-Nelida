import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Asegúrate de importar el servicio API

function ForgotPassword() {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [loading, setLoading] = useState(false); // Estado para saber si estamos esperando la respuesta de la API
  const [error, setError] = useState(null); // Estado para mostrar errores
  const [success, setSuccess] = useState(false); // Estado para mostrar mensaje de éxito
  const [formError, setFormError] = useState(''); // Estado para los errores del formulario

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#2c2c2c',
    borderRadius: '15px',
    padding: '2rem',
    color: 'white',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px',
  };

  const inputStyle = {
    backgroundColor: '#4a4a4a',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    padding: '12px 16px',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem',
  };

  const logoStyle = {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const handleForgotPassword = async () => {
    setFormError(''); // Limpiar errores previos del formulario
    setLoading(true); // Habilitamos el estado de carga
    setError(null); // Reseteamos cualquier error previo
    setSuccess(false); // Reseteamos el estado de éxito

    // Validación de formulario (campo obligatorio)
    if (!email) {
      setFormError('Por favor, ingresa tu correo electrónico.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.auth.forgotPassword(email); // Llamada a la API para recuperar la contraseña
      setSuccess(true); // Si la solicitud es exitosa, actualizamos el estado de éxito
    } catch (error) {
      setError('Hubo un error al enviar la solicitud. Por favor, inténtalo nuevamente.'); // Manejo de errores
    } finally {
      setLoading(false); // Finalizamos el estado de carga
    }
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div style={{ ...cardStyle, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="mb-4">¿Olvidaste tu contraseña?</h2>
              <p className="mb-4" style={{ color: '#ccc' }}>
                Ingresa el correo electrónico con el que te registraste, te ayudaremos a recuperar tu cuenta.
              </p>

              {success && (
                <p style={{ color: 'green', marginBottom: '1rem' }}>
                  ¡Revisa tu correo! Te hemos enviado un enlace para recuperar tu contraseña.
                </p>
              )}

              {error && (
                <p style={{ color: 'red', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              {formError && (
                <p style={{ color: 'red', marginBottom: '1rem' }}>
                  {formError}
                </p>
              )}

              <div>
                <div className="mb-4">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@org.mx"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el valor del input
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  style={buttonStyle}
                  onClick={handleForgotPassword} // Llamamos a la función cuando el usuario hace click
                  disabled={loading} // Deshabilitamos el botón mientras estamos esperando la respuesta de la API
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>

                <div className="text-center">
                  <a href="#" style={linkStyle} onClick={goToLogin}>
                    Volver al inicio de sesión
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
