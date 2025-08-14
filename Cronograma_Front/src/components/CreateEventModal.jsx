// src/components/EventModal.jsx
import React, { useState, useEffect } from "react";
import api from "./../services/api";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function CreateEventModal({ show, onClose, onRegister }) {

  const [tiposEvento, setTiposEvento] = useState([]);

  const [duracionHoras, setDuracionHoras] = useState(0);
  const calcularDuracion = (inicioFecha, inicioHora, finFecha, finHora) => {
      if (inicioFecha && inicioHora && finFecha && finHora) {
        const fechaInicioCompleta = new Date(`${inicioFecha}T${inicioHora}`);
        const fechaFinCompleta = new Date(`${finFecha}T${finHora}`);
        const diferencia = (fechaFinCompleta - fechaInicioCompleta) / (1000 * 60 * 60);

        // Evita valores negativos o NaN
        if (!isNaN(diferencia) && diferencia >= 0) {
          setDuracionHoras(diferencia.toFixed(2));
        } else {
          setDuracionHoras(0);
        }
      }
  };

  useEffect(() => {
    if (show) {
      api.tipoEvento.getAll()
        .then((res) => setTiposEvento(res.data))
        .catch((err) => console.error("Error al cargar tipos de evento", err));
    }
  }, [show]);

  const [formData, setFormData] = useState({
    nombreEvento: "",
    tipoEventoId: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    ubicacion: "",
    responsable: ""
  });

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value
    };

    setFormData(updatedForm);

    // Solo recalcula si los campos necesarios están definidos
    calcularDuracion(
      name === "fechaInicio" ? value : formData.fechaInicio,
      name === "horaInicio" ? value : formData.horaInicio,
      name === "fechaFin" ? value : formData.fechaFin,
      name === "horaFin" ? value : formData.horaFin
    );
  };

  // Envía los datos combinando fecha y hora
  const handleSubmit = () => {
    const fechaInicioCompleta = `${formData.fechaInicio}T${formData.horaInicio}`;
    const fechaFinCompleta = `${formData.fechaFin}T${formData.horaFin}`;

    onRegister({
      ...formData,
      tipoEventoId: parseInt(formData.tipoEventoId),
      fechaInicio: fechaInicioCompleta,
      fechaFin: fechaFinCompleta,
      duracionHoras: parseFloat(duracionHoras)
    });
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
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="nombreEvento"
              value={formData.nombreEvento}
              onChange={handleChange}
              placeholder="Ej. Fiesta de apertura"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Tipo de evento</Form.Label>
            <Form.Select
              name="tipoEventoId"
              value={formData.tipoEventoId}
              onChange={handleChange}
              className="custom-input"
              >
              <option value="">Selecciona un tipo</option>
              {tiposEvento.map((tipo) => (
                <option key={tipo.idTipoEvento} value={tipo.idTipoEvento}>
                  {tipo.nombre}
                  </option>
                ))}
              </Form.Select>
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
              placeholder="Ej. Auditorio Central"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Nombre del responsable</Form.Label>
            <Form.Control
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="custom-input"
            />
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
              disabled={duracionHoras <= 0}
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
