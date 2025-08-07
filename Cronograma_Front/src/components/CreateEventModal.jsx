import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function CreateEventModal({ show, onClose, onRegister }) {
  const [formData, setFormData] = useState({
    nombreEvento: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    ubicacion: "",
    numAsistentes: "",
    responsable: "",
    qrCodigo: "",
    qrUrl: "",
    idTipoEvento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.nombreEvento || !formData.fechaInicio || !formData.horaInicio) {
      alert("Nombre del evento, fecha y hora de inicio son obligatorios.");
      return;
    }

    const userId = localStorage.getItem("userId") || 1;

    const eventoPayload = {
      nombreEvento: formData.nombreEvento,
      fechaInicio: `${formData.fechaInicio}T${formData.horaInicio}`,
      fechaFin: `${formData.fechaFin}T${formData.horaFin}`,
      ubicacion: formData.ubicacion,
      numAsistentes: parseInt(formData.numAsistentes || 0),
      responsable: formData.responsable,
      qrCodigo: formData.qrCodigo,
      qrUrl: formData.qrUrl,
      usuario: {
        idUsuario: parseInt(userId),
      },
      tipoEvento: {
        idTipoEvento: parseInt(formData.idTipoEvento),
      },
      estado: {
        idEstado: 1,
      },
    };

    onRegister(eventoPayload);
    resetAndClose();
  };

  const resetAndClose = () => {
    setFormData({
      nombreEvento: "",
      fechaInicio: "",
      horaInicio: "",
      fechaFin: "",
      horaFin: "",
      ubicacion: "",
      numAsistentes: "",
      responsable: "",
      qrCodigo: "",
      qrUrl: "",
      idTipoEvento: "",
    });
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={resetAndClose}
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
              placeholder="Ej. Conferencia 2025"
              className="custom-input"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className="custom-input"
              />
            </Col>
            <Col>
              <Form.Label className="text-white">Hora de inicio</Form.Label>
              <Form.Control
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="custom-input"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Fecha de fin</Form.Label>
              <Form.Control
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="custom-input"
              />
            </Col>
            <Col>
              <Form.Label className="text-white">Hora de fin</Form.Label>
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
            <Form.Label className="text-white">Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ej. Auditorio Central"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Número de asistentes</Form.Label>
            <Form.Control
              type="number"
              name="numAsistentes"
              value={formData.numAsistentes}
              onChange={handleChange}
              placeholder="Ej. 150"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Responsable</Form.Label>
            <Form.Control
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              placeholder="Ej. Laura Martínez"
              className="custom-input"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">QR Código</Form.Label>
              <Form.Control
                type="text"
                name="qrCodigo"
                value={formData.qrCodigo}
                onChange={handleChange}
                placeholder="Ej. QR123456789"
                className="custom-input"
              />
            </Col>
            <Col>
              <Form.Label className="text-white">QR URL</Form.Label>
              <Form.Control
                type="text"
                name="qrUrl"
                value={formData.qrUrl}
                onChange={handleChange}
                placeholder="https://example.com/qr/QR123456789"
                className="custom-input"
              />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Tipo de evento (ID)</Form.Label>
            <Form.Control
              type="number"
              name="idTipoEvento"
              value={formData.idTipoEvento}
              onChange={handleChange}
              placeholder="Ej. 1"
              className="custom-input"
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <span
              onClick={resetAndClose}
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
        }
        .custom-input:focus {
          background-color: #3b3b5c;
          border-color: #764ba2;
          box-shadow: 0 0 8px #764ba2;
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
