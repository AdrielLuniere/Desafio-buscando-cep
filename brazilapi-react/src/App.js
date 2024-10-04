import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [corretoras, setCorretoras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCorretoras, setFilteredCorretoras] = useState([]);
  const [cep, setCep] = useState('');
  const [cepInfo, setCepInfo] = useState(null);
  const [cepError, setCepError] = useState('');

  useEffect(() => {
    // Fetching data from BrazilAPI
    fetch('https://brasilapi.com.br/api/corretoras/v1')
      .then(response => response.json())
      .then(data => {
        setCorretoras(data);
        setFilteredCorretoras(data); // Inicializa a lista filtrada com todas as corretoras
      })
      .catch(error => console.error('Erro ao buscar corretoras:', error));
  }, []);

  // Função para lidar com a busca e filtrar corretoras conforme o usuário digita
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Mantém o valor que o usuário está digitando
    setSearchTerm(searchValue); // Atualiza o estado do termo de busca
    
    // Filtro das corretoras por nome, cidade ou CNPJ
    const filtered = corretoras.filter(corretora =>
      corretora.nome.toLowerCase().includes(searchValue) ||
      corretora.cidade.toLowerCase().includes(searchValue) ||
      corretora.cnpj.includes(searchValue)
    );

    setFilteredCorretoras(filtered); // Atualiza a lista de corretoras exibida
  };

  // Função para buscar informações do CEP na BrazilAPI
  const handleCepSearch = (e) => {
    e.preventDefault();

    if (cep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos.');
      return;
    }

    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setCepError('CEP não encontrado.');
        } else {
          setCepInfo(data);
          setCepError('');
        }
      })
      .catch(() => setCepError('Erro ao buscar o CEP.'));
  };

  return (
    <div className="container">
      <h1>Catálogo de Corretoras e Busca por CEP</h1>

      {/* Busca de corretoras */}
      <input
        type="text"
        placeholder="Buscar por Nome, Cidade ou CNPJ"
        onChange={handleSearch}
        value={searchTerm}  // Garante que o estado é corretamente vinculado ao campo de input
        className="search-box"
      />
      <ul>
        {filteredCorretoras.length > 0 ? (
          filteredCorretoras.map((corretora) => (
            <li key={corretora.cnpj}>
              <div className="name">{corretora.nome}</div>
              <div className="details">{corretora.cidade} / {corretora.cnpj}</div>
            </li>
          ))
        ) : (
          <li>Nenhuma corretora encontrada</li>
        )}
      </ul>

      {/* Busca por CEP */}
      <form onSubmit={handleCepSearch} className="cep-form">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="cep-input"
        />
        <button type="submit" className="cep-button">Buscar CEP</button>
      </form>

      {cepError && <p className="error-message">{cepError}</p>}

      {cepInfo && (
        <div className="cep-info">
          <h2>Detalhes do CEP:</h2>
          <p><strong>CEP:</strong> {cepInfo.cep}</p>
          <p><strong>Logradouro:</strong> {cepInfo.street}</p>
          <p><strong>Bairro:</strong> {cepInfo.neighborhood}</p>
          <p><strong>Cidade:</strong> {cepInfo.city}</p>
          <p><strong>Estado:</strong> {cepInfo.state}</p>
        </div>
      )}
    </div>
  );
}

export default App;












// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BrokerList from './components/BrokerList';
// import CepSearch from './components/CepSearch';
// import Navbar from './components/Navbar';
// import './App.css'

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<BrokerList />} />
//           <Route path="/cep" element={<CepSearch />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
