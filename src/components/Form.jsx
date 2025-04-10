import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ResultsGas from './ResultsGas';

const EnergyForm = ({ onCalculate }) => {
  const [energyType, setEnergyType] = React.useState('luz');
  const [compania, setCompania] = React.useState('naturgy');
  const [rangoConsumo, setRangoConsumo] = React.useState('RL1');
  const [paqueteEndesa, setPaqueteEndesa] = React.useState('soloGas');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      tipoEnergia: energyType,
      compania,
      mantenimiento: formData.get('mantenimiento') === 'on'
    };

      if (energyType === 'luz') {
      data.consumo = Number(formData.get('consumo'));
      data.potenciaP1 = Number(formData.get('potenciaP1'));
      data.potenciaP2 = Number(formData.get('potenciaP2'));
      data.gasEndesa = formData.get('gasEndesa') === 'on';
    } else {
      data.rangoConsumo = rangoConsumo;
      data.consumoGas = Number(formData.get('consumoGas'));
      if (compania === 'endesa') {
        data.paquete = formData.get('paqueteEndesa');
      }
    }

    onCalculate(data);
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h3 className="mb-4">Datos de Consumo</h3>
      
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Tipo de energía</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Luz"
                name="energyType"
                id="luz"
                checked={energyType === 'luz'}
                onChange={() => setEnergyType('luz')}
              />
              <Form.Check
                inline
                type="radio"
                label="Gas"
                name="energyType"
                id="gas"
                checked={energyType === 'gas'}
                onChange={() => setEnergyType('gas')}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {energyType === 'luz' ? (
        <>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Consumo mensual (kWh)</Form.Label>
                <Form.Control
                  type="number"
                  name="consumo"
                  required
                  min="0"
                  step="0.01"
                  placeholder="Introduce el consumo mensual"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Potencia Punta (kW)</Form.Label>
                <Form.Control
                  type="number"
                  name="potenciaP1"
                  required
                  min="0"
                  step="0.1"
                  placeholder="Potencia P1"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Potencia Valle (kW)</Form.Label>
                <Form.Control
                  type="number"
                  name="potenciaP2"
                  required
                  min="0"
                  step="0.1"
                  placeholder="Potencia P2"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name="gasEndesa"
                  label="Contratar gas con Endesa"
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Compañía</Form.Label>
                <Form.Select 
                  value={compania} 
                  onChange={(e) => setCompania(e.target.value)}
                >
                  <option value="naturgy">Naturgy</option>
                  <option value="repsol">Repsol</option>
                  <option value="endesa">Endesa</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Rango de consumo anual</Form.Label>
                <Form.Select 
                  value={rangoConsumo} 
                  onChange={(e) => setRangoConsumo(e.target.value)}
                >
                  <option value="RL1">RL.1 (Menos de 5,000 kWh)</option>
                  <option value="RL2">RL.2 (5,000 a 15,000 kWh)</option>
                  <option value="RL3">RL.3 (15,000 a 50,000 kWh)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Consumo de gas (kWh)</Form.Label>
                <Form.Control
                  type="number"
                  name="consumoGas"
                  required
                  min="0"
                  step="0.01"
                  placeholder="Introduce el consumo de gas"
                />
              </Form.Group>
            </Col>
          </Row>

          {compania === 'endesa' && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Combinación Gas Endesa</Form.Label>
                  <Form.Select 
                    name="paqueteEndesa"
                    value={paqueteEndesa}
                    onChange={(e) => setPaqueteEndesa(e.target.value)}
                  >
                    <option value="soloGas">Gas solo</option>
                    <option value="gasOkGas">Gas + ok gas</option>
                    <option value="gasLuz">Gas + Luz</option>
                    <option value="gasLuzOkGas">Gas + Luz + ok gas</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}
        </>
      )}

      <Row className="mb-4">
        <Col md={12}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="mantenimiento"
              label={`Incluir mantenimiento ${energyType === 'luz' ? 'eléctrico' : 'de gas'}`}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" variant="primary" className="w-100">
        Comparar Tarifas
      </Button>
    </Form>
  );
};

export default EnergyForm;
