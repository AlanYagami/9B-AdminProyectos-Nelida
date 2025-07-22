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
  colors = [], // Arreglo de colores simulando datos de DB
}) {
  if (!show || !selectedSlot) return null;

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditable ? 'Crear/Editar Evento' : 'Detalles del Evento'}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Fecha:</strong> {selectedSlot.date.toDateString()}</p>
            <p><strong>Hora:</strong> {selectedSlot.time}</p>

            {isEditable ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Título del evento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Título del evento"
                    value={eventTitle}
                    maxLength={10}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
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
                    className="form-select"
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
                <p><strong>Título:</strong> {eventTitle || 'Sin título'}</p>
                <p><strong>Descripción:</strong> {eventDescription || 'Sin descripción'}</p>
                <p><strong>Color:</strong> {eventColor || 'No asignado'}</p>
              </>
            )}
          </div>
          <div className="modal-footer justify-content-between">
            {!isEditable && (
              <button className="btn btn-outline-light">Descargar</button>
            )}

            <div>
              <button className="btn btn-secondary me-2" onClick={onClose}>Cerrar</button>
              {isEditable && (
                <button className="btn btn-primary" onClick={onSubmit}>Guardar</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
