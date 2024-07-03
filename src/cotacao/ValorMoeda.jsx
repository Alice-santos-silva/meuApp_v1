import React from 'react';

function ValorMoeda({ dollarRate, setDollarRate, euroRate, setEuroRate, baseValue, setBaseValue, numPeople, setNumPeople }) {
  return (
    <div>
      <div>
        <label>
          Dollar:
          <input
            type="number"
            value={dollarRate}
            onChange={(e) => setDollarRate(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Euro:
          <input
            type="number"
            value={euroRate}
            onChange={(e) => setEuroRate(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Valor de Base:
          <input
            type="number"
            value={baseValue}
            onChange={(e) => setBaseValue(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Número de Pax:
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

export default ValorMoeda;
