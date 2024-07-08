import React, { useState } from 'react';
import Servico from './Servico';
import Resultado from './Resultado';
import ValorMoeda from './ValorMoeda';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../App.css';

function Cotacoes() {
  const [dollarRate, setDollarRate] = useState(4.8);// Taxa de câmbio do dólar
  const [services, setServices] = useState([]); // Lista de serviços
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cotação
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Servico services={services} setServices={setServices} />
          <Typography variant="h4" component="h1" gutterBottom>
            Cotação
          </Typography>
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
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCalculate}>
                Calcular Cotação
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Resultado results={results} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Cotacoes;
