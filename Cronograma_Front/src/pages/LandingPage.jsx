import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Calendar, Settings, Wrench, Volume2 } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();
  const icons = [<Calendar size={32} />, <Settings size={32} />, <Wrench size={32} />, <Volume2 size={32} />];
  const features = [
    "Crea tus propios cronogramas",
    "Personalízalos",
    "Ajusta a tus necesidades",
    "Difunde con seguridad",
  ];

  const goToHome = () => {
    navigate('/home');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#">SICALE</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2" onClick={goToLogin}>Inicia Sesión</Button>
          <Button variant="primary" onClick={goToRegister}>Regístrate</Button>
        </Nav>
      </Navbar>

      {/* Hero */}
      <div className="bg-dark text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Cambia la forma de organizar tus eventos</h2>
              <p>Una organización personalizada que todo el mundo agradecerá</p>
              <Button variant="primary" onClick={goToHome}>Ver más</Button>
            </Col>
            <Col md={6}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/728/272/non_2x/time-management-concept-schedule-and-creative-idea-man-and-woman-sitting-and-standing-at-calendar-team-of-people-at-work-working-on-solutions-together-illustration-flat-design-on-background-vector.jpg"
                alt="Calendario"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Funcionalidades */}
      <div className="bg-secondary text-white py-5">
        <Container className="text-center">
          <h4>Diseñado para ayudarte a mejorar la experiencia de tus eventos y ocasiones especiales</h4>
          <Row className="mt-4">
            {features.map((text, idx) => (
              <Col md={3} key={idx}>
                <div className="mb-2">{icons[idx]}</div>
                <p>{text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* QR Section */}
      <div className="bg-dark text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://t3.ftcdn.net/jpg/04/09/31/56/360_F_409315615_rZ0zS2l3c0226sx6q5HNgIuKIDKykn5S.jpg"
                alt="QR Code"
                className="img-fluid"
              />
            </Col>
            <Col md={6}>
              <h4>Con una nueva forma de compartir</h4>
              <p>
                Una vez que termines de crear tu cronograma, puedes difundirlo a todo el público a través de un código QR que permitirá visualizarlo al instante.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
