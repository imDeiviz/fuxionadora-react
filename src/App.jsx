import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import EnergyForm from './components/Form';
import Results from './components/Results';
import ResultsGas from './components/ResultsGas';
import { useEnergyCalculator } from './hooks/useEnergyCalculator';
import Tarifas from './pages/Tarifas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const { results, loading, calculateAllRates } = useEnergyCalculator();

  return (
    <Router>
      <div className="app">
        <NavbarComponent />
        <Container className="py-4">
          <Routes>
            <Route path="/" element={
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
            } />
            <Route path="/tarifas" element={<Tarifas />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
