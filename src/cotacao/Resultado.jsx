import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function Resultado({ results }) {
  return (
    <Box sx={{ mt: 4 }}>
      {results.map((result, index) => (
        <Paper
          key={index}
          sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }} // Adiciona um background levemente acinzentado
        >
          <Typography variant="h6" component="div" gutterBottom>
            {result.name}
          </Typography>
          <Typography variant="body1">
            Total em Dólar: ${result.totalCost}
          </Typography>
          <Typography variant="body1">
            Preço por pessoa: ${result.pricePerPerson}
          </Typography>
          <Typography variant="body1">
            Preço em Euro: €{result.priceInEuro}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default Resultado;
