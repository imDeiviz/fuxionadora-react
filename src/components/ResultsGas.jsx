import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { ALQUILER_CONTADOR } from '../constants/rates';

const ResultsGas = ({ results, loading }) => {
  if (loading) {
    return (
      <Card className="h-100">
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Calculando...</span>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="h-100">
        <Card.Body className="text-center">
          <p className="text-muted mb-0">
            Completa el formulario para ver la comparativa de tarifas de gas
          </p>
        </Card.Body>
      </Card>
    );
  }

  const sortedResults = [...results].sort((a, b) => a.total - b.total);
  const mejorTarifa = sortedResults[0];

  return (
    <Card className="h-100">
      <Card.Body>
        <h3 className="card-title text-center mb-4">Comparativa de Tarifas de Gas</h3>
        
        <Table responsive striped hover className="mb-4">
          <thead>
            <tr>
              <th>Compañía</th>
              <th>Término Fijo</th>
              <th>Término Variable</th>
              <th>Mant.</th>
              <th>Total</th>
              <th>Ahorro</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => (
              <tr key={result.compania} className={result === mejorTarifa ? 'table-success' : ''}>
                <td>{result.compania}</td>
                <td>{result.terminoFijo.toFixed(2)} €</td>
                <td>{result.terminoVariable.toFixed(2)} €</td>
                <td>{result.costoMantenimiento.toFixed(2)} €</td>
                <td><strong>{result.total.toFixed(2)} €</strong></td>
                <td>
                  {result === mejorTarifa ? (
                    <span className="text-success">Mejor precio</span>
                  ) : (
                    <span className="text-danger">
                      +{(result.total - mejorTarifa.total).toFixed(2)} €
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="alert alert-info">
          <h5>Desglose de la mejor tarifa ({mejorTarifa.compania})</h5>
          <p className="mb-1">Término fijo: {mejorTarifa.terminoFijo.toFixed(2)} €</p>
          <p className="mb-1">Término variable: {mejorTarifa.terminoVariable.toFixed(2)} €</p>
          {mejorTarifa.costoMantenimiento > 0 && (
            <p className="mb-1">Mantenimiento: {mejorTarifa.costoMantenimiento.toFixed(2)} €</p>
          )}
          <p className="mb-1">Subtotal: {mejorTarifa.subtotal.toFixed(2)} €</p>
          <p className="mb-1">Impuesto gas: {mejorTarifa.impuestoGas.toFixed(2)} €</p>
          <p className="mb-1">Alquiler contador: {ALQUILER_CONTADOR.toFixed(2)} €</p>
          <p className="mb-1">Base factura: {mejorTarifa.baseFactura.toFixed(2)} €</p>
          <p className="mb-1">IVA (21%): {mejorTarifa.iva.toFixed(2)} €</p>
          <p className="mb-0"><strong>Total: {mejorTarifa.total.toFixed(2)} €</strong></p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ResultsGas;
