// src/components/BrokerList.js
import React, { useState, useEffect } from 'react';

function BrokerList() {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fazendo requisição para a BrazilAPI
    fetch('https://brasilapi.com.br/api/banks/v1')
      .then(response => response.json())
      .then(data => {
        setBrokers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Catálogo de Corretoras</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {brokers.map(broker => (
            <li key={broker.code}>
              {broker.name} - {broker.city} / {broker.cnpj}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrokerList;
