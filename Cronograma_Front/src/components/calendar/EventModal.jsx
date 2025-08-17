import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

function EventModal({
  show,
  onClose,
  onSubmit,
  onDelete,
  eventTitle,
  setEventTitle,
  eventDescription,
  setEventDescription,
  eventColor,
  setEventColor,
  selectedSlot,
  isEditable,
  colors = [],
  onDownloadPDF,
  editingBlock
}) {
  const [errors, setErrors] = useState({});

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    eventTitle: Yup.string()
      .trim()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9][a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]*[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/, 'Usa un título válido (letras, números, espacios)')
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(50, 'El título no puede exceder 50 caracteres')
      .required('El título es obligatorio'),
    eventDescription: Yup.string()
      .trim()
      .min(5, 'La descripción debe tener al menos 5 caracteres')
      .max(150, 'La descripción no puede exceder 150 caracteres')
      .required('La descripción es obligatoria'),
    eventColor: Yup.string()
      .required('Debes seleccionar un color')
  });

  // Limpiar errores cuando se abra/cierre el modal
  useEffect(() => {
    if (show) {
      setErrors({});
    }
  }, [show]);

  const handleTitleChange = (e) => {
    let value = e.target.value;

    // Prevenir espacios al inicio y espacios múltiples
    if (value.length === 1 && value === ' ') return;
    value = value.replace(/\s{2,}/g, ' ');

    setEventTitle(value);

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors.eventTitle) {
      setErrors(prev => ({ ...prev, eventTitle: '' }));
    }
  };

  const handleDescriptionChange = (e) => {
    let value = e.target.value;

    // Prevenir espacios al inicio y espacios múltiples
    if (value.length === 1 && value === ' ') return;
    value = value.replace(/\s{2,}/g, ' ');

    setEventDescription(value);

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors.eventDescription) {
      setErrors(prev => ({ ...prev, eventDescription: '' }));
    }
  };

  const handleColorChange = (e) => {
    setEventColor(e.target.value);

    // Limpiar error específico cuando el usuario seleccione
    if (errors.eventColor) {
      setErrors(prev => ({ ...prev, eventColor: '' }));
    }
  };

  const handleTitleBlur = (e) => {
    setEventTitle(e.target.value.trim());
  };

  const handleDescriptionBlur = (e) => {
    setEventDescription(e.target.value.trim());
  };

  const handleSubmit = async () => {
    try {
      // Validar con Yup
      await validationSchema.validate({
        eventTitle: eventTitle.trim(),
        eventDescription: eventDescription.trim(),
        eventColor
      }, { abortEarly: false });

      setErrors({}); // Limpiar errores si la validación pasa
      onSubmit(); // Llamar la función original de submit

    } catch (error) {
      if (error.name === 'ValidationError') {
        // Errores de validación
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  if (!show || !selectedSlot) return null;

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
        <div className="modal-content custom-modal-content">
          <div className="modal-header custom-modal-header">
            <h5 className="modal-title text-white">
              {isEditable ? (editingBlock ? 'Editar Evento' : 'Crear Evento') : 'Detalles del Evento'}
            </h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body text-white">
            <p><strong>Fecha:</strong> {selectedSlot.date.toDateString()}</p>
            <p><strong>Hora:</strong> {selectedSlot.time}</p>

            {isEditable ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Título del evento</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Título del evento"
                    value={eventTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                  />
                  {errors.eventTitle && <div style={errorStyle}>{errors.eventTitle}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control custom-input"
                    rows="3"
                    placeholder="Descripción del evento"
                    value={eventDescription}
                    onChange={handleDescriptionChange}
                    onBlur={handleDescriptionBlur}
                  />
                  {errors.eventDescription && <div style={errorStyle}>{errors.eventDescription}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <select
                    className="form-select custom-select"
                    value={eventColor}
                    onChange={handleColorChange}
                  >
                    <option value="">Seleccione un color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  {errors.eventColor && <div style={errorStyle}>{errors.eventColor}</div>}
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
              <div className="d-flex">
                <button className="btn btn-outline-light me-1" onClick={onDownloadPDF}>
                  Descargar
                </button>
              </div>
            )}

            {editingBlock && isEditable && (
              <button className="btn btn-danger me-auto" onClick={onDelete}>
                Eliminar
              </button>
            )}

            <div>
              <button className="btn btn-secondary me-2 custom-btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              {isEditable && (
                <button className="btn btn-primary custom-btn-primary" onClick={handleSubmit}>
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