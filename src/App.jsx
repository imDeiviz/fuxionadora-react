import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import EnergyForm from './components/Form';
import Results from './components/Results';
import ResultsGas from './components/ResultsGas';
import { useEnergyCalculator } from './hooks/useEnergyCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const { results, loading, calculateAllRates } = useEnergyCalculator();

  return (
    <div className="app">
      <NavbarComponent />
      <Container className="py-4">
        <div className="row">
          <div className="col-md-5">
            <EnergyForm onCalculate={calculateAllRates} />
          </div>
          <div className="col-md-7">
            {results && (results[0]?.tipoEnergia === 'gas' ? 
              <ResultsGas results={results} loading={loading} /> : 
              <Results results={results} loading={loading} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
