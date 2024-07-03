import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

function ValorMoeda({ dollarRate, setDollarRate, euroRate, setEuroRate, baseValue, setBaseValue, numPeople, setNumPeople }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Valores da Moeda
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Dollar"
          type="number"
          value={dollarRate}
          onChange={(e) => setDollarRate(parseFloat(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Euro"
          type="number"
          value={euroRate}
          onChange={(e) => setEuroRate(parseFloat(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Valor de Base"
          type="number"
          value={baseValue}
          onChange={(e) => setBaseValue(parseFloat(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Número de Pax"
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(parseInt(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>
    </Box>
  );
}

export default ValorMoeda;
