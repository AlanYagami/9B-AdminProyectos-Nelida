import React, { useState } from 'react';

const QRGenerator = () => {
  const [url, setUrl] = useState('https://youtu.be/lrUUx73LZdo?si=Bsi7UDgnAcJtnRl6');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = async () => {
    if (!url.trim()) {
      alert('Por favor ingresa una URL válida');
      return;
    }

    setIsLoading(true);
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
      setQrCode(qrUrl);
    } catch (error) {
      console.error('Error al generar QR:', error);
      alert('Error al generar el código QR');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'codigo-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearQR = () => {
    setQrCode('');
    setUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-top-4">
                <h1 className="card-title mb-0 fs-2 fw-bold">
                  <i className="bi bi-qr-code me-3"></i>
                  Generador de Códigos QR
                </h1>
                <p className="mb-0 mt-2 opacity-90">Convierte cualquier URL en un código QR</p>
              </div>
              
              <div className="card-body p-5">
                <div className="mb-4">
                  <label htmlFor="urlInput" className="form-label fw-semibold fs-5 text-dark">
                    <i className="bi bi-link-45deg me-2 text-primary"></i>
                    URL de destino
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-globe text-muted"></i>
                    </span>
                    <input
                      type="url"
                      className="form-control border-start-0 ps-0"
                      id="urlInput"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://ejemplo.com"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="form-text">
                    Ingresa la URL completa incluyendo https:// o http://
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
                  <button
                    className="btn btn-primary btn-lg px-4 me-md-2"
                    onClick={generateQR}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-magic me-2"></i>
                        Generar QR
                      </>
                    )}
                  </button>
                  
                  {qrCode && (
                    <button
                      className="btn btn-outline-secondary btn-lg px-4"
                      onClick={clearQR}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Limpiar
                    </button>
                  )}
                </div>

                {qrCode && (
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-3 shadow-sm d-inline-block mb-4">
                      <img
                        src={qrCode}
                        alt="Código QR generado"
                        className="img-fluid rounded-2"
                        style={{ maxWidth: '300px', height: 'auto' }}
                      />
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        className="btn btn-success btn-lg px-4 me-md-2"
                        onClick={downloadQR}
                      >
                        <i className="bi bi-download me-2"></i>
                        Descargar QR
                      </button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-light rounded-3">
                      <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        Este código QR redirige a: <strong className="text-break">{url}</strong>
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <small className="text-muted">
                💡 Escanea el código QR con la cámara de tu teléfono para acceder al enlace
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" 
        rel="stylesheet" 
      />
      
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />

      <style jsx>{`
        .bg-gradient-to-br {
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
        }
        
        .bg-gradient-to-r {
          background: linear-gradient(90deg, #2563eb 0%, #4f46e5 100%);
        }
        
        .card {
          transition: transform 0.2s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .btn {
          transition: all 0.2s ease-in-out;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        .input-group-text {
          border-right: none;
        }
        
        .form-control:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25);
        }
      `}</style>
    </div>
  );
};

export default QRGenerator;