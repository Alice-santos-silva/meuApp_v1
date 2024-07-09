import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

const initialCards = [
  { id: 1, text: 'Task 1', status: 'Novo Orçamento' },
  { id: 2, text: 'Task 2', status: 'Synoptique e Condições' },
  { id: 3, text: 'Task 3', status: 'Montagem do Roteiro' },
  { id: 4, text: 'Task 4', status: 'Done' },
];

const Board = () => {
  const [cards, setCards] = useState(initialCards);

  const handleDropCard = (id, newStatus) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, status: newStatus } : card
      )
    );
  };

  const columns = ['Novo Orçamento', 'Synoptique e Condições', 'Montagem do Roteiro', 'Alinhamento de Expectativas', 'Disponibilidade e Tarifas', 'Preparação da Cotação', 'Coleta de Informações para a Proposta', 'Preparação da Apresentação', 'Proposta Enviada', 'Orçamento Confirmado', 'Orçamento Suspenso'];

  return (
    <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', padding: '16px' }}>
      {columns.map((column) => (
        <KanbanColumn
          key={column}
          status={column}
          cards={cards.filter((card) => card.status === column)}
          onDropCard={handleDropCard}
        />
      ))}
    </div>
  );
};

export default Board;
