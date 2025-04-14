import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Link to="/" className="d-flex align-items-center fw-bold brand-purple text-decoration-none">
          <Calculator className="me-2" />
          Fuxionadora
        </Link>
        <Link to="/tarifas" className="ms-auto">
          <Button variant="primary">
            Tarifas (Precios)
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
