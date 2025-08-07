import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { correo, contrasena } = formData;

    if (!correo || !contrasena) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena ambos campos',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white'
      });
      return;
    }

    try {
      const response =await api.auth.login({
        correo,
        contra: contrasena,
      });

      const token = response.data.data;
      const userRole = login(token); 

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white'
      }).then(() => {
        if (userRole === 'role_admin') {
          navigate('/admin/logged-events');
        } else if (userRole === 'role_organizador') {
          navigate('/organizer/my-events');
        } else {
          navigate('/home');
        }
      });
    } catch (error) {

    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#2c2c2c',
    borderRadius: '15px',
    padding: '2rem',
    color: 'white',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    backgroundColor: '#4a4a4a',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    padding: '12px 16px',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div className="text-white">
              <h1 className="display-1 fw-bold mb-0">SICALE</h1>
              <div className="mt-4">
                <img
                  src="src/assets/img/calendario.png"
                  alt="Calendario"
                  className="img-fluid"
                  style={{ maxWidth: '80%', height: 'auto' }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div style={cardStyle}>
              <div onClick={() => navigate('/landing')} style={{ cursor: 'pointer' }}>
                <img
                  src="src/assets/img/logo.png"
                  alt="Logo"
                  className="img-fluid mb-4"
                />
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    placeholder="ejemplo@org.mx"
                    style={inputStyle}
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="contrasena"
                    className="form-control"
                    placeholder="••••••••"
                    style={inputStyle}
                    value={formData.contrasena}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100 mb-3"
                  style={buttonStyle}
                  onClick={handleSubmit}
                >
                  Iniciar
                </button>

                <div className="text-center">
                  <a onClick={() => navigate('/register')} style={linkStyle}>
                    ¿No tienes una cuenta? <strong>Regístrate</strong>
                  </a>
                </div>
                <div className="text-center mt-2">
                  <a onClick={() => navigate('/forgot-password')} style={linkStyle}>
                    ¿Olvidaste la contraseña?
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

export default Login;
