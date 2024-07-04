import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Modal, Box, TextField } from '@mui/material';
import { styled } from '@mui/system';

const BoardWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  overflowX: 'auto',
  padding: '20px',
  whiteSpace: 'nowrap',
});

const BoardContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width:'100vw'
});

const ColumnContainer = styled(Grid)({
  minWidth: '300px',
  margin: '0 10px',
});

const CardContainer = styled(Card)({
  margin: '10px 0',
  cursor: 'pointer',
});

const AddCardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
});

const ModalContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: 24,
  borderRadius: '4px',
});

const Board = () => {
  const [cards, setCards] = useState([
    { id: '1', title: 'Tarefa 1', columnId: '1' },
    { id: '2', title: 'Tarefa 2', columnId: '2' },
    { id: '3', title: 'Tarefa 3', columnId: '3' },
  ]);

  const [columns, setColumns] = useState([
    { id: '1', title: 'Novo Orçamento' },
    { id: '2', title: 'Synoptique e condições' },
    { id: '3', title: 'Montagem do Roteiro' },
    { id: '4', title: 'Alinhamento de Expectativas' },
    { id: '5', title: 'Disponibilidade e Tarifas' },
    { id: '6', title: 'Preparação da Cotação' },
    { id: '7', title: 'Coleta de Informações para Proposta' },
    { id: '8', title: 'Preparação da Apresentação' },
    { id: '9', title: 'Proposta Enviada' },
    { id: '10', title: 'Orçamento Confirmação' },
    { id: '11', title: 'Orçamento Suspenso' },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', columnId: '' });
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardDrop = (cardId, newColumnId) => {
    setCards(cards.map(card =>
      card.id === cardId ? { ...card, columnId: newColumnId } : card
    ));
  };

  const handleOpenModal = (columnId) => {
    setNewCard({ ...newCard, columnId });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleAddCard = () => {
    const newCardData = {
      id: (cards.length + 1).toString(),
      ...newCard,
    };
    setCards([...cards, newCardData]);
    setNewCard({ title: '', columnId: '' });
    handleCloseModal();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseCardModal = () => {
    setSelectedCard(null);
  };

  return (
    <BoardWrapper>
      <BoardContainer>
        {columns.map(column => (
          <ColumnContainer item key={column.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{column.title}</Typography>
                {cards.filter(card => card.columnId === column.id).map(card => (
                  <CardContainer
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('cardId', card.id)}
                  >
                    <CardContent>
                      <Typography>{card.title}</Typography>
                    </CardContent>
                  </CardContainer>
                ))}
                <AddCardContainer>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(column.id)}>Adicionar Cartão</Button>
                </AddCardContainer>
              </CardContent>
            </Card>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleCardDrop(e.dataTransfer.getData('cardId'), column.id)}
              style={{ minHeight: '20px', backgroundColor: '#f0f0f0', marginTop: '10px' }}
            />
          </ColumnContainer>
        ))}
      </BoardContainer>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <ModalContent>
          <Typography variant="h6">Novo Cartão</Typography>
          <TextField 
            value={newCard.title} 
            onChange={e => setNewCard({ ...newCard, title: e.target.value })} 
            label="Título" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
          />
          <Button variant="contained" color="primary" onClick={handleAddCard}>Adicionar Cartão</Button>
          <Button variant="outlined" onClick={handleCloseModal}>Fechar</Button>
        </ModalContent>
      </Modal>
      <Modal open={Boolean(selectedCard)} onClose={handleCloseCardModal}>
        <ModalContent>
          <Typography variant="h6">Detalhes do Cartão</Typography>
          {selectedCard && (
            <>
              <Typography><strong>Título:</strong> {selectedCard.title}</Typography>
            </>
          )}
          <Button variant="outlined" onClick={handleCloseCardModal}>Fechar</Button>
        </ModalContent>
      </Modal>
    </BoardWrapper>
  );
};

export default Board;
