import React from 'react';
import Calculator from './Calculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Calulator Boradcaster</h1>
      </header>
      <div className='calculator-container'>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
