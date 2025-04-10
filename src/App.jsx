import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Calculator } from 'lucide-react';
import EnergyForm from './components/Form';
import Results from './components/Results';
import ResultsGas from './components/ResultsGas';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEnergyCalculator } from './hooks/useEnergyCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const { results, loading, calculateAllRates } = useEnergyCalculator();

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Calculator className="me-2" />
            Comparador de Tarifas Eléctricas
          </Navbar.Brand>
          <div className="ms-auto">
            <button
              className="btn btn-outline-primary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </Container>
      </Navbar>

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
