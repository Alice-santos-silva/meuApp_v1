import React, { useState } from 'react';

function Servico({ services, setServices }) {
  const [newService, setNewService] = useState({ name: '', costs: [], quantity: 1 });

  const handleAddService = () => {
    setServices([...services, newService]);
    setNewService({ name: '', costs: [], quantity: 1 });
  };

  const handleServiceCostChange = (index, value) => {
    const updatedCosts = [...newService.costs];
    updatedCosts[index] = parseFloat(value);
    setNewService({ ...newService, costs: updatedCosts });
  };

  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  return (
    <div>
      <h2>Adicionar Novo Serviço</h2>
      <div>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleNewServiceChange}
          />
        </label>
      </div>
      <div>
        <label>
          Quantidade:
          <input
            type="number"
            name="quantity"
            value={newService.quantity}
            onChange={handleNewServiceChange}
          />
        </label>
      </div>
      <div>
        <label>
          Custos:
          {newService.costs.map((cost, index) => (
            <input
              key={index}
              type="number"
              value={cost}
              onChange={(e) => handleServiceCostChange(index, e.target.value)}
            />
          ))}
          <button onClick={() => setNewService({ ...newService, costs: [...newService.costs, 0] })}>
            Adicionar Custo
          </button>
        </label>
      </div>
      <button onClick={handleAddService}>Adicionar Serviço</button>
      <div>
        <h2>Serviços</h2>
        {services.map((service, index) => (
          <div key={index}>
            <h4>{service.name}</h4>
            <p>Quantidade: {service.quantity}</p>
            <p>Custos: {service.costs.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servico;
