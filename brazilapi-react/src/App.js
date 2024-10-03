/// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrokerList from './components/BrokerList';
import CepSearch from './components/CepSearch';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<BrokerList />} />
          <Route path="/cep" element={<CepSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
