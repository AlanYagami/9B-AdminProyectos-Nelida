import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Obtienes el token de la URL

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, ingresa ambas contraseñas',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Por favor, asegúrate de que las contraseñas coincidan',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white',
      });
      return;
    }

    try {
      const response = await api.auth.resetPassword(token, newPassword);

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada',
        text: 'Tu contraseña se ha actualizado correctamente',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white',
      }).then(() => {
        navigate('/login'); // Redirige al login después de un cambio exitoso
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cambiar la contraseña, intenta nuevamente.',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white',
      });
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
