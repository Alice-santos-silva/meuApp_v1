import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Adicionar Novo Serviço
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Nome"
          name="name"
          value={newService.name}
          onChange={handleNewServiceChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Quantidade"
          type="number"
          name="quantity"
          value={newService.quantity}
          onChange={handleNewServiceChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography variant="body1" gutterBottom>
          Custos:
        </Typography>
        {newService.costs.map((cost, index) => (
          <TextField
            key={index}
            type="number"
            label={`Custo ${index + 1}`}
            value={cost}
            onChange={(e) => handleServiceCostChange(index, e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        ))}
        <Button
          variant="outlined"
          onClick={() => setNewService({ ...newService, costs: [...newService.costs, 0] })}
          sx={{ mb: 2 }}
        >
          Adicionar Custo
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddService}>
        Adicionar Serviço
      </Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="div" gutterBottom sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
          Serviços
        </Typography>
        {services.map((service, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">{service.name}</Typography>
            <Typography>Quantidade: {service.quantity}</Typography>
            <Typography>Custos: {service.costs.join(', ')}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Servico;
