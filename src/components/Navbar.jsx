import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Calculator } from 'lucide-react';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold brand-purple">
          <Calculator className="me-2" />
          Comparador de Tarifas Eléctricas
        </Navbar.Brand>
        <Button variant="primary" className="ms-auto">
          Tarifas (Precios)
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
