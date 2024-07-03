import React from 'react';

function Resultado({ results }) {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h4>{result.name}</h4>
          <p>Total em Dólar: {result.totalCost}</p>
          <p>Preço por pessoa: ${result.pricePerPerson}</p>
          <p>Preço em Euro: €{result.priceInEuro}</p>
        </div>
      ))}
    </div>
  );
}

export default Resultado;
