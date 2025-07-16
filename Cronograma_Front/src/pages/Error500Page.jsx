import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error500Page() {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate('/landing');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row w-100 align-items-center">
        {/* Columna izquierda - Texto */}
        <div className="col-12 col-lg-6 text-center text-lg-start">
          
          {/* Número 500 */}
          <h1 className="display-1 fw-bold mb-4" style={{ 
            color: '#EF4444', 
            fontSize: '10rem',
            fontWeight: '800',
            lineHeight: '0.8',
            letterSpacing: '-0.05em'
          }}>
            500
          </h1>
          
          {/* Título principal */}
          <h2 className="h2 fw-bold mb-3" style={{ 
            color: '#2c3e50',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Oops! Esta página no<br />
            esta en el calendario
          </h2>
          
          {/* Subtítulo */}
          <p className="text-muted mb-4" style={{ 
            fontSize: '1.1rem',
            color: '#6c757d',
            fontWeight: '400'
          }}>
            Pero no te preocupes, aún hay muchos eventos por organizar
          </p>
          
          {/* Botón */}
          <button 
            onClick={goToLanding}
            className="btn btn-lg px-4 py-3"
            style={{ 
              backgroundColor: '#6366f1',
              borderColor: '#6366f1',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            Ir al inicio
          </button>
          
        </div>
        
        {/* Columna derecha - Ilustración */}
        <div className="col-12 col-lg-6 text-center mt-5 mt-lg-0">
          <img 
            src="src\assets\img\bote.png" 
            alt="Ilustración 500" 
            className="img-fluid"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
        
      </div>
    </div>
  );
}

export default Error500Page;
