
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div style={{
              ...cardStyle,
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <h2 className="mb-4">¿Olvidaste tu contraseña?</h2>
              <p className="mb-4" style={{ color: '#ccc' }}>
                Ingresa el correo electrónico con el que te registraste, te ayudaremos a recuperar tu cuenta
              </p>
              
              <div>
                <div className="mb-4">
                  <label className="form-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="ejemplo@org.mx"
                    style={inputStyle}
                  />
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary mb-3"
                  style={buttonStyle}
                >
                  Enviar
                </button>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    style={linkStyle}
                    onClick={goToLogin}
                  >
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
