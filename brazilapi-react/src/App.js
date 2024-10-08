import React, { useState, useEffect } from 'react';
import './App.css';
import { Desdobramento } from './components/desdobramento';

function App() {
  const [corretoras, setCorretoras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCorretoras, setFilteredCorretoras] = useState([]);
  const [cep, setCep] = useState('');
  const [cepInfo, setCepInfo] = useState(null);
  const [cepError, setCepError] = useState('');
  const [corretora, setCorretora] = useState({});
  const [showModal, setShowModal] = useState(false)
  
  const getCorretora = (corretora) => {
    setCorretora(corretora)
    setShowModal(true)
}
  useEffect(() => {
    
    fetch('https://brasilapi.com.br/api/cvm/corretoras/v1')
      .then(response => response.json())
      .then(data => {
        setCorretoras(data);
        setFilteredCorretoras(data); 
      })
      .catch(error => console.error('Erro ao buscar corretoras:', error));
  }, []);

  
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();   
    setSearchTerm(searchValue); 
    
    const filtered = corretoras.filter(corretora =>
      
      corretora.nome_social.toLowerCase().includes(searchValue) ||
      corretora.municipio.toLowerCase().includes(searchValue) ||
      corretora.cnpj.includes(searchValue)
    );

    setFilteredCorretoras([...filtered]); 
  };

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
      {showModal && <Desdobramento corretora={corretora}
      onClick={() => setShowModal(false)}/>}
      <input
        type="text"
        placeholder="Buscar por Nome, Cidade ou CNPJ"
        onChange={handleSearch}
        value={searchTerm}
        className="search-box"
      />
      <ul>
        {filteredCorretoras.length > 0 ? (
          filteredCorretoras.map((corretora, index) => (
            <li key={index}
              onClick={() => getCorretora(corretora)}>
              
              <div className="name">{corretora.nome_social}</div>
              <div className="details">{corretora.municipio} / {corretora.cnpj}</div>
            </li>
          ))
        ) : (
          <li>Nenhuma corretora encontrada</li>
        )}
      </ul>

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
