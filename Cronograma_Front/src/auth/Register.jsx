
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
    fontWeight: 'bold'
  };

  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/landing');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="text-white">
              <h1 className="display-1 fw-bold mb-0">SICALE</h1>
              <div className="mt-4">
                <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                  <path d="M50 50h200v100H50z" fill="none" stroke="white" strokeWidth="3"/>
                  <path d="M50 50l20-20h200l20 20v100l-20 20H70l-20-20z" fill="none" stroke="white" strokeWidth="3"/>
                  <rect x="70" y="70" width="30" height="20" fill="white"/>
                  <circle cx="120" cy="80" r="5" fill="white"/>
                  <circle cx="140" cy="80" r="5" fill="white"/>
                  <circle cx="160" cy="80" r="5" fill="white"/>
                  <circle cx="180" cy="80" r="5" fill="white"/>
                  <circle cx="200" cy="80" r="5" fill="white"/>
                  <circle cx="80" cy="100" r="5" fill="white"/>
                  <circle cx="100" cy="100" r="5" fill="white"/>
                  <circle cx="120" cy="100" r="5" fill="white"/>
                  <circle cx="140" cy="100" r="5" fill="white"/>
                  <circle cx="160" cy="100" r="5" fill="white"/>
                  <circle cx="180" cy="100" r="5" fill="white"/>
                  <circle cx="200" cy="100" r="5" fill="white"/>
                  <circle cx="80" cy="120" r="5" fill="white"/>
                  <circle cx="100" cy="120" r="5" fill="white"/>
                  <circle cx="120" cy="120" r="5" fill="white"/>
                  <circle cx="140" cy="120" r="5" fill="white"/>
                  <circle cx="160" cy="120" r="5" fill="white"/>
                  <circle cx="180" cy="120" r="5" fill="white"/>
                  <circle cx="200" cy="120" r="5" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div style={cardStyle}>
              <div style={logoStyle}>
                <div style={{
                  width: '25px',
                  height: '25px',
                  background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  borderRadius: '5px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    width: '25px',
                    height: '25px',
                    background: 'linear-gradient(45deg, #764ba2, #667eea)',
                    borderRadius: '5px'
                  }}></div>
                </div>
              </div>
              
              <div>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Juan Pérez Herrera"
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
                
                <button 
                  type="button" 
                  className="btn btn-primary w-100 mb-3"
                  style={buttonStyle}
                >
                  Registrarme
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary w-100 mb-3"
                  style={buttonStyle}
                  onClick={goToAbout}
                >
                  Volver a la página principal
                </button>
                
                <div className="text-center">
                  <span style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    ¿Ya tienes una cuenta?{' '}
                  </span>
                  <a 
                    href="#" 
                    style={linkStyle}
                    onClick={goToLogin}
                  >
                    Iniciar sesión
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