import 'bootstrap/dist/css/bootstrap.min.css';

function EventModal({
  show,
  onClose,
  onSubmit,
  eventTitle,
  setEventTitle,
  eventDescription,
  setEventDescription,
  eventColor,
  setEventColor,
  selectedSlot,
  isEditable,
  colors = [],
}) {
  if (!show || !selectedSlot) return null;

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
        <div className="modal-content custom-modal-content">
          <div className="modal-header custom-modal-header">
            <h5 className="modal-title text-white">
              {isEditable ? 'Crear/Editar Evento' : 'Detalles del Evento'}
            </h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body text-white">
            <p>
              <strong>Fecha:</strong> {selectedSlot.date.toDateString()}
            </p>
            <p>
              <strong>Hora:</strong> {selectedSlot.time}
            </p>

            {isEditable ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Título del evento</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Título del evento"
                    value={eventTitle}
                    maxLength={10}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control custom-input"
                    rows="3"
                    placeholder="Descripción del evento"
                    value={eventDescription}
                    maxLength={27}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <select
                    className="form-select custom-select"
                    value={eventColor}
                    onChange={(e) => setEventColor(e.target.value)}
                  >
                    <option value="">Seleccione un color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Título:</strong> {eventTitle || 'Sin título'}
                </p>
                <p>
                  <strong>Descripción:</strong> {eventDescription || 'Sin descripción'}
                </p>
                <p>
                  <strong>Color:</strong> {eventColor || 'No asignado'}
                </p>
              </>
            )}
          </div>
          <div className="modal-footer justify-content-between">
            {!isEditable && (
              <button className="btn btn-outline-light">Descargar</button>
            )}

            <div>
              <button className="btn btn-secondary me-2 custom-btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              {isEditable && (
                <button className="btn btn-primary custom-btn-primary" onClick={onSubmit}>
                  Guardar
                </button>
              )}
            </div>
          </div>

          <style jsx="true">{`
            .custom-modal-dialog {
              max-width: 600px;
              margin: 1.75rem auto;
            }
            .custom-modal-content {
              background-color: #1e1e2f;
              border-radius: 8px;
              color: white;
            }
            .custom-modal-header {
              border-bottom: 1px solid #44475a;
              background-color: #292b3c;
            }
            .custom-input {
              background-color: #2a2a3d;
              color: white;
              border: 1px solid #555770;
            }
            .custom-input::placeholder {
              color: #bbb;
              opacity: 1;
            }
            .custom-input:focus {
              background-color: #3b3b5c;
              border-color: #764ba2;
              color: white;
              box-shadow: 0 0 8px #764ba2;
              outline: none;
            }
            .custom-select {
              background-color: #2a2a3d;
              color: white;
              border: 1px solid #555770;
            }
            .custom-select:focus {
              background-color: #3b3b5c;
              border-color: #764ba2;
              color: white;
              box-shadow: 0 0 8px #764ba2;
              outline: none;
            }
            .btn-close-white {
              filter: invert(1);
            }
            .custom-btn-primary {
              background-color: #764ba2;
              border-color: #764ba2;
              font-weight: bold;
              padding: 6px 20px;
            }
            .custom-btn-primary:hover {
              background-color: #5e3a7a;
              border-color: #5e3a7a;
            }
            .custom-btn-secondary {
              background-color: #44475a;
              border-color: #44475a;
              color: #ccc;
            }
            .custom-btn-secondary:hover {
              background-color: #5a5f78;
              border-color: #5a5f78;
              color: white;
            }

            /* Responsividad */
            @media (max-width: 576px) {
              .custom-modal-dialog {
                max-width: 90vw;
                margin: 1rem auto;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
