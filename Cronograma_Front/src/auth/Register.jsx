import { useNavigate } from 'react-router-dom';

function Register() {

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
    transition: 'all 0.3s ease'
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem'
  };

  const navigate = useNavigate();

  const goToLanding = () => {
    navigate('/landing');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          {/* Imagen grande visible solo en pantallas md o mayores */}
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

          {/* Formulario */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div style={cardStyle}>
              {/* Logo clickeable */}
              <div 
                onClick={goToLanding} 
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src="src/assets/img/logo.png"
                  alt="Logo"
                  className="img-fluid mb-4"
                />
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Juan Carlos Bodoque"
                    style={inputStyle}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="ejemplo@org.mx"
                    style={inputStyle}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="••••••••"
                    style={inputStyle}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Repetir Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="••••••••"
                    style={inputStyle}
                  />
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary w-100 mb-3"
                  style={buttonStyle}
                >
                  Registrarme
                </button>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    style={linkStyle}
                    onClick={goToLogin}
                  >
                    ¿Ya tienes una cuenta? <strong>Iniciar sesión</strong>
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

export default Register;
