import React, { useState } from 'react';
import Servico from './Servico';
import Resultado from './Resultado';
import ValorMoeda from './ValorMoeda'

function Cotacoes() {
  const [dollarRate, setDollarRate] = useState(4.8);
  const [services, setServices] = useState([]);
  const [margin, setMargin] = useState(0.15);
  const [tax, setTax] = useState(0.05);
  const [euroRate, setEuroRate] = useState(1.03);
  const [baseValue, setBaseValue] = useState(345);
  const [numPeople, setNumPeople] = useState(2);
  const [results, setResults] = useState([]);

  const calculateTotalCost = (service) => {
    return service.costs.reduce((acc, cost) => acc + cost, 0);
  };

  const calculatePricePerPerson = (totalCost, quantity) => {
    const totalWithMargin = totalCost * (1 + margin);
    const totalWithTax = totalWithMargin * (1 + tax);
    return totalWithTax / quantity;
  };

  const convertToEuro = (price) => {
    return price / euroRate;
  };

  const handleCalculate = () => {
    const newResults = services.map((service) => {
      const totalCost = calculateTotalCost(service);
      const pricePerPerson = calculatePricePerPerson(totalCost, numPeople);
      const priceInEuro = convertToEuro(pricePerPerson);

      return {
        name: service.name,
        totalCost: totalCost.toFixed(2),
        pricePerPerson: pricePerPerson.toFixed(2),
        priceInEuro: priceInEuro.toFixed(2),
      };
    });

    setResults(newResults);
  };

  return (
    <div>
      <header>
        <h1>Cotação</h1>
        <ValorMoeda
          dollarRate={dollarRate}
          setDollarRate={setDollarRate}
          euroRate={euroRate}
          setEuroRate={setEuroRate}
          baseValue={baseValue}
          setBaseValue={setBaseValue}
          numPeople={numPeople}
          setNumPeople={setNumPeople}
        />
        <button onClick={handleCalculate}>Calcular Cotação</button>
        <Resultado results={results} />
        <Servico services={services} setServices={setServices} />
      </header>
    </div>
  );
}

export default Cotacoes;
