import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim() // Elimina espacios al inicio y al final automáticamente
      .email('Ingresa un correo electrónico válido')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El formato del correo no es válido')
      .required('El correo electrónico es obligatorio')
  });

  const handleForgotPassword = async () => {
    setValidationError('');
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validar con Yup
      await validationSchema.validate({ email }, { abortEarly: false });

      const response = await api.auth.forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Error de validación
        setValidationError(error.errors[0]);
      } else {
        // Error del API
        setError('Hubo un error al enviar la solicitud. Por favor, inténtalo nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

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
    marginBottom: '0.5rem',
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginBottom: '1rem',
  };

  const successStyle = {
    color: '#51cf66',
    fontSize: '0.875rem',
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

  const goToLogin = () => {
    navigate('/login');
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
                <div style={successStyle}>
                  ¡Revisa tu correo! Te hemos enviado un enlace para recuperar tu contraseña.
                </div>
              )}

              {error && (
                <div style={errorStyle}>
                  {error}
                </div>
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValidationError(''); // Limpiar error cuando el usuario escriba
                    }}
                  />
                  {validationError && <div style={errorStyle}>{validationError}</div>}
                </div>

                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  style={buttonStyle}
                  onClick={handleForgotPassword}
                  disabled={loading}
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