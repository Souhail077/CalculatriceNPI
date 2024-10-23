import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Apropos from './Apropos'; // Importation de la nouvelle page

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value + ' ');
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/calculate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: expression.trim() }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0a0fba' }}>
          <Link className="navbar-brand" to="/"> &nbsp; &nbsp; &nbsp; &nbsp;
            <i className="fas fa-calculator"></i> {/* Icône calculatrice */}
            &nbsp;Calculatrice
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto"> {/* Ajout de ml-auto ici */}
              <li className="nav-item">
                <Link className="nav-link" to="/apropos">
                  <i className="fas fa-info-circle"></i> {/* Icône info */}
                  &nbsp; À Propos
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes> {/* Remplacement de Switch par Routes */}
          <Route path="/apropos" element={<Apropos />} /> {/* Utilisation de element dans v6 */}
          <Route path="/" element={
            <div className="calculator-container">
              <img src="https://ayomi.fr/static/ui/contact/build/favicon.ico" className="calculator-icon" alt="calculator-icon"></img>
              <h4>Calculatrice NPI</h4>  
              <br />
              <div className="expression-display">{expression || "0"}</div>
              <div className="result-display"> = {result}</div>
              <div className="calculator">
                {['7', '8', '9', '/'].map((btn) => (
                  <button key={btn} className="btn btn-light" onClick={() => handleButtonClick(btn)}>{btn}</button>
                ))}
                {['4', '5', '6', '*'].map((btn) => (
                  <button key={btn} className="btn btn-light" onClick={() => handleButtonClick(btn)}>{btn}</button>
                ))}
                {['1', '2', '3', '-'].map((btn) => (
                  <button key={btn} className="btn btn-light" onClick={() => handleButtonClick(btn)}>{btn}</button>
                ))}
                {['0', '.', '+'].map((btn) => (
                  <button key={btn} className="btn btn-light" onClick={() => handleButtonClick(btn)}>{btn}</button>
                ))}
                <button className="btn btn-danger" onClick={handleClear}>C</button>
                <button className="btn btn-primary" onClick={handleCalculate}>=</button>
                {/* Bouton pour télécharger le CSV */}
                <button 
                  className="btn btn-success" 
                  onClick={() => window.open('http://127.0.0.1:8000/download/csv/', '_blank')}
                >
                  <i className="fas fa-file-csv"></i> {/* Icône CSV */}
                  &nbsp; CSV
                </button>
              </div>
            </div>
          } />
        </Routes>

        <footer className="footer mt-auto py-3" style={{ backgroundColor: '#0a0fba', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
          <div className="container">
            <span className="text-light">
              <i className="fas fa-code" style={{ color: '#B22222' }}></i> 
              &nbsp; &nbsp;Développé par Souhail ROUAI - 2024
            </span> 
            <br />
            <span className="text-light">
              <i className="fas fa-phone" style={{ color: '#B22222' }}></i> 
              &nbsp; &nbsp;+33 7 53 50 46 38
            </span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
