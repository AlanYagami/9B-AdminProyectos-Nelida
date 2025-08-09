// src/components/EventModal.jsx
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function CreateEventModal({ show, onClose, onRegister }) {
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
              placeholder="Ej. Fiesta de apertura"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Tipo de evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. Conferencia, Fiesta..."
              className="custom-input"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Duración en horas</Form.Label>
              <Form.Control
                type="number"
                placeholder="2"
                className="custom-input"
              />
            </Col>
            <Col>
              <Form.Label className="text-white">Horarios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. 14:00 - 16:00"
                className="custom-input"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-white">Día inicio</Form.Label>
              <Form.Control type="date" className="custom-input" />
            </Col>
            <Col>
              <Form.Label className="text-white">Día fin</Form.Label>
              <Form.Control type="date" className="custom-input" />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Ubicación del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. Auditorio Central"
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Nombre del responsable</Form.Label>
            <Form.Control
              type="text"
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
              onClick={onRegister}
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
          background-color: #1e1e2f; /* gris oscuro azulado */
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

        /* Responsividad */
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
