import React, { useState, useEffect } from "react";
import { eventoSchema } from "../validations/eventSchema";
import api from "./../services/api";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function CreateEventModal({ show, onClose, onRegister }) {
  const [tiposEvento, setTiposEvento] = useState([]);
  const [duracionHoras, setDuracionHoras] = useState(0);
  const [errors, setErrors] = useState({});
  const usuarioId = localStorage.getItem("userId");

  // Esquema de validación con Yup
  const validationSchema = eventoSchema;

  const calcularDuracion = (inicioFecha, inicioHora, finFecha, finHora) => {
    if (inicioFecha && inicioHora && finFecha && finHora) {
      const fechaInicioCompleta = new Date(`${inicioFecha}T${inicioHora}`);
      const fechaFinCompleta = new Date(`${finFecha}T${finHora}`);
      const diferencia = (fechaFinCompleta - fechaInicioCompleta) / (1000 * 60 * 60);

      if (!isNaN(diferencia) && diferencia >= 0) {
        setDuracionHoras(diferencia.toFixed(2));
      } else {
        setDuracionHoras(0);
      }
    }
  };

  useEffect(() => {
    if (show) {
      api.tipoEvento
        .getAll()
        .then((res) => {
          setTiposEvento(res.data);
        })
        .catch((err) => console.error("Error al cargar tipos de evento", err));

      // Limpiar errores al abrir el modal
      setErrors({});
    }
  }, [show]);

  const [formData, setFormData] = useState({
    nombreEvento: "",
    descripcionEvento: "",
    tipoEventoId: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    ubicacion: "",
    responsable: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Procesamiento específico para diferentes campos
    if (name === 'nombreEvento' || name === 'ubicacion') {
      // Evitar espacios al inicio y espacios múltiples
      if (value.length === 1 && value === ' ') return;
      processedValue = value.replace(/\s{2,}/g, ' ');
    } else if (name === 'responsable') {
      // Solo letras y espacios, sin espacios al inicio
      if (value.length === 1 && value === ' ') return;
      processedValue = value.replace(/\s{2,}/g, ' ').replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (name === 'horaInicio' || name === 'horaFin') {
      // Mantener el valor tal como viene del input time
      processedValue = value;
    }

    const updatedForm = { ...formData, [name]: processedValue };
    setFormData(updatedForm);

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    calcularDuracion(
      name === "fechaInicio" ? processedValue : formData.fechaInicio,
      name === "horaInicio" ? processedValue : formData.horaInicio,
      name === "fechaFin" ? processedValue : formData.fechaFin,
      name === "horaFin" ? processedValue : formData.horaFin
    );
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Limpiar espacios al final en campos de texto
    if (['nombreEvento', 'ubicacion', 'responsable'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value.trim()
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Validar con Yup
      await validationSchema.validate(formData, { abortEarly: false });

      // Validación adicional para duración
      if (duracionHoras <= 0) {
        setErrors({ general: 'La duración del evento debe ser mayor a 0 horas' });
        return;
      }

      setErrors({}); // Limpiar errores si la validación pasa

      // Formatear horas para que tengan el formato HH:mm:ss
      const horaInicioFormato = formData.horaInicio.length === 5
        ? `${formData.horaInicio}:00`
        : formData.horaInicio;

      const horaFinFormato = formData.horaFin.length === 5
        ? `${formData.horaFin}:00`
        : formData.horaFin;

      // Construir el payload exactamente como en Postman
      const payload = {
        nombreEvento: formData.nombreEvento.trim(),
        descripcionEvento: formData.descripcionEvento.trim(),
        fechaInicio: `${formData.fechaInicio}T${horaInicioFormato}`,
        fechaFin: `${formData.fechaFin}T${horaFinFormato}`,
        horaInicio: horaInicioFormato,
        horaFin: horaFinFormato,
        numHoras: parseFloat(duracionHoras),
        responsable: formData.responsable.trim(),
        ubicacion: formData.ubicacion.trim(),
        estado: { idEstado: 1 },
        tipoEvento: { idTipoEvento: parseInt(formData.tipoEventoId) },
        usuario: { idUsuario: parseInt(usuarioId) }
      };

      onRegister(payload);
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

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal"
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="text-white">Agregar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {errors.general && <div style={{ ...errorStyle, textAlign: 'center', marginBottom: '1rem' }}>{errors.general}</div>}

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="nombreEvento"
              value={formData.nombreEvento}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Fiesta de apertura"
              className="custom-input"
            />
            {errors.nombreEvento && <div style={errorStyle}>{errors.nombreEvento}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Descripción del evento</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcionEvento"
              value={formData.descripcionEvento}
              onChange={handleChange}
              placeholder="Escribe la descripción del evento"
              className="custom-input"
              rows={3}
            />
            {errors.descripcionEvento && <div style={errorStyle}>{errors.descripcionEvento}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Tipo de evento</Form.Label>
            <Form.Select
              name="tipoEventoId"
              value={formData.tipoEventoId}
              onChange={handleChange}
              className="custom-input text-white"
            >
              <option value="">Selecciona un tipo</option>
              {tiposEvento.map((tipo) => (
                <option key={tipo.idTipoEvento} value={tipo.idTipoEvento}>
                  {tipo.tipoEvento}
                </option>
              ))}
            </Form.Select>
            {errors.tipoEventoId && <div style={errorStyle}>{errors.tipoEventoId}</div>}
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Día inicio</Form.Label>
              <Form.Control
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className="custom-input"
              />
              {errors.fechaInicio && <div style={errorStyle}>{errors.fechaInicio}</div>}
            </Col>
            <Col>
              <Form.Label className="text-white">Día fin</Form.Label>
              <Form.Control
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="custom-input"
              />
              {errors.fechaFin && <div style={errorStyle}>{errors.fechaFin}</div>}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Hora inicio</Form.Label>
              <Form.Control
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="custom-input"
              />
              {errors.horaInicio && <div style={errorStyle}>{errors.horaInicio}</div>}
            </Col>
            <Col>
              <Form.Label className="text-white">Hora fin</Form.Label>
              <Form.Control
                type="time"
                name="horaFin"
                value={formData.horaFin}
                onChange={handleChange}
                className="custom-input"
              />
              {errors.horaFin && <div style={errorStyle}>{errors.horaFin}</div>}
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Duración total (horas)</Form.Label>
            <Form.Control
              type="number"
              value={duracionHoras}
              readOnly
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Ubicación del evento</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Auditorio Central"
              className="custom-input"
            />
            {errors.ubicacion && <div style={errorStyle}>{errors.ubicacion}</div>}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Nombre del responsable</Form.Label>
            <Form.Control
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Juan Pérez"
              className="custom-input"
            />
            {errors.responsable && <div style={errorStyle}>{errors.responsable}</div>}
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <span
              onClick={onClose}
              style={{
                cursor: "pointer",
                color: "#764BA2",
                fontWeight: "bold",
              }}
            >
              Cancelar
            </span>

            <Button
              style={{
                backgroundColor: "#764BA2",
                borderColor: "#764BA2",
                fontWeight: "bold",
                padding: "6px 20px",
              }}
              onClick={handleSubmit}
            >
              Registrar evento
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <style jsx="true">{`
        .custom-modal .modal-dialog {
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
          border-color: #764BA2;
          color: white;
          box-shadow: 0 0 8px #764BA2;
        }
        .custom-input option {
          background-color: #2a2a3d;
          color: white;
        }
        @media (max-width: 576px) {
          .custom-modal .modal-dialog {
            max-width: 90vw;
            margin: 1rem auto;
          }
        }
      `}</style>
    </Modal>
  );
}

export default CreateEventModal;