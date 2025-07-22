// src/components/EventModal.jsx
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function CreateEventModal({ show, onClose, onRegister }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control type="text" placeholder="Ej. Fiesta de apertura" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de evento</Form.Label>
            <Form.Control type="text" placeholder="Ej. Conferencia, Fiesta..." />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Duración en horas</Form.Label>
              <Form.Control type="number" placeholder="2" />
            </Col>
            <Col>
              <Form.Label>Horarios</Form.Label>
              <Form.Control type="text" placeholder="Ej. 14:00 - 16:00" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Día inicio</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col>
              <Form.Label>Día fin</Form.Label>
              <Form.Control type="date" />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación del evento</Form.Label>
            <Form.Control type="text" placeholder="Ej. Auditorio Central" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Nombre del responsable</Form.Label>
            <Form.Control type="text" placeholder="Ej. Juan Pérez" />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <span
              onClick={onClose}
              style={{
                cursor: "pointer",
                color: "#8A99EB",
                fontWeight: "bold",
              }}
            >
              Cancelar
            </span>

            <Button
              style={{
                backgroundColor: "#667EEA",
                borderColor: "#667EEA",
              }}
              onClick={onRegister}
            >
              Registrar evento
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateEventModal;
