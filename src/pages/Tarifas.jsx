import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { TARIFAS } from '../constants/rates';

const companyNames = Object.keys(TARIFAS);

const Tarifas = () => {
  const [selectedCompanies, setSelectedCompanies] = useState(companyNames);

  const handleCompanyChange = (company) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const renderLuzTariffs = (luz) => {
    if (!luz) return <tr><td colSpan="3">No hay datos de luz</td></tr>;

    // Flatten luz tariffs for display
    const rows = [];
    for (const key in luz) {
      const value = luz[key];
      if (typeof value === 'object') {
        // Check if object has only primitive values (number/string)
        const allPrimitive = Object.values(value).every(v => typeof v !== 'object');
        if (allPrimitive) {
          for (const subKey in value) {
            rows.push(
              <tr key={`${key}-${subKey}`}>
                <td>{key}</td>
                <td>{subKey}</td>
                <td>{value[subKey]}</td>
              </tr>
            );
          }
        } else {
          // Nested object, render keys and values recursively or as JSON string
          rows.push(
            <tr key={key}>
              <td>{key}</td>
              <td colSpan="2">
                <pre style={{whiteSpace: 'pre-wrap', margin: 0}}>{JSON.stringify(value, null, 2)}</pre>
              </td>
            </tr>
          );
        }
      } else {
        rows.push(
          <tr key={key}>
            <td>{key}</td>
            <td>-</td>
            <td>{value}</td>
          </tr>
        );
      }
    }
    return rows;
  };

  const renderGasTariffs = (gas) => {
    if (!gas) return <tr><td colSpan="3">No hay datos de gas</td></tr>;

    // Flatten gas tariffs for display
    const rows = [];
    for (const key in gas) {
      const value = gas[key];
      if (typeof value === 'object') {
        for (const subKey in value) {
          if (typeof value[subKey] === 'object') {
            for (const subSubKey in value[subKey]) {
              rows.push(
                <tr key={`${key}-${subKey}-${subSubKey}`}>
                  <td>{key}</td>
                  <td>{subKey} - {subSubKey}</td>
                  <td>{value[subKey][subSubKey]}</td>
                </tr>
              );
            }
          } else {
            rows.push(
              <tr key={`${key}-${subKey}`}>
                <td>{key}</td>
                <td>{subKey}</td>
                <td>{value[subKey]}</td>
              </tr>
            );
          }
        }
      } else {
        rows.push(
          <tr key={key}>
            <td>{key}</td>
            <td>-</td>
            <td>{value}</td>
          </tr>
        );
      }
    }
    return rows;
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Tarifas de Luz y Gas</h1>
      <Form>
        <Form.Group>
          <Form.Label>Filtrar por Compañías:</Form.Label>
          <div>
            {companyNames.map(company => (
              <Form.Check
                inline
                key={company}
                label={company.charAt(0).toUpperCase() + company.slice(1)}
                type="checkbox"
                id={`checkbox-${company}`}
                checked={selectedCompanies.includes(company)}
                onChange={() => handleCompanyChange(company)}
              />
            ))}
          </div>
        </Form.Group>
      </Form>
      {selectedCompanies.map(company => (
        <Card className="my-4" key={company}>
          <Card.Header as="h5">{company.charAt(0).toUpperCase() + company.slice(1)}</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>Luz</h6>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Detalle</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderLuzTariffs(TARIFAS[company].luz)}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6>Gas</h6>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Detalle</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderGasTariffs(TARIFAS[company].gas)}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Tarifas;
