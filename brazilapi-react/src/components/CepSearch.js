
import React, { useState } from 'react';

function CepSearch() {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (cep.length !== 8) {
      setError('CEP inválido');
      return;
    }

    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError('CEP não encontrado');
          setCepData(null);
        } else {
          setCepData(data);
          setError('');
        }
      });
  };

  return (
    <div>
      <h1>Buscar CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p>{error}</p>}

      {cepData && (
        <div>
          <p><strong>CEP:</strong> {cepData.cep}</p>
          <p><strong>Rua:</strong> {cepData.street}</p>
          <p><strong>Cidade:</strong> {cepData.city}</p>
          <p><strong>Estado:</strong> {cepData.state}</p>
        </div>
      )}
    </div>
  );
}

export default CepSearch;
