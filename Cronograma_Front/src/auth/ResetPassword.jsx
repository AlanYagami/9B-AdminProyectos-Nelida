import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import api from '../services/api';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .trim() // Elimina espacios al inicio y al final automáticamente
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número')
      .required('La nueva contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .trim() // Elimina espacios al inicio y al final automáticamente
      .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña')
  });

  const handleSubmit = async () => {
    try {
      // Validar con Yup
      await validationSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false }
      );
      
      setErrors({}); // Limpiar errores si la validación pasa

      const response = await api.auth.resetPassword(token, newPassword);

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada',
        text: 'Tu contraseña se ha actualizado correctamente',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Errores de validación
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
        
        Swal.fire({
          icon: 'warning',
          title: 'Datos inválidos',
          text: 'Por favor, corrige los errores en el formulario',
          confirmButtonColor: '#667eea',
          background: '#2c2c2c',
          color: 'white',
        });
      } else {
        // Error del API
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cambiar la contraseña, intenta nuevamente.',
          confirmButtonColor: '#667eea',
          background: '#2c2c2c',
          color: 'white',
        });
      }
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

  const buttonStyle = {
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="mb-4 text-center">Restablecer Contraseña</h2>

        <div className="mb-3">
          <label className="form-label">Nueva Contraseña</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            placeholder="••••••••"
            style={inputStyle}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <div style={errorStyle}>{errors.newPassword}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="••••••••"
            style={inputStyle}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;