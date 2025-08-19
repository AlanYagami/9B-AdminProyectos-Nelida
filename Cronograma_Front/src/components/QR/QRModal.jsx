// QRModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL_PUBLIC } from '../../services/config';

const QRModal = ({ show, onClose, eventoId }) => {
  if (!eventoId) return null;

  const url = `${API_BASE_URL_PUBLIC}/cronograma?id=${eventoId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Código QR del evento</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Escanea este código QR para descargar el cronograma:</p>
        <img src={qrUrl} alt="QR" className="img-fluid" style={{ maxWidth: '300px' }} />
        <div className="mt-3">
          <small className="text-muted">{url}</small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="success" as="a" href={qrUrl} download={`QR-${eventoId}.png`}>
          Descargar QR
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRModal;
