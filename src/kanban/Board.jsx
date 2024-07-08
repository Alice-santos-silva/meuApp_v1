import "../App.css";
// src/App.js
import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

const initialCards = [
  { id: 1, text: 'Task 1', status: 'To Do' },
  { id: 2, text: 'Task 2', status: 'To Do' },
  { id: 3, text: 'Task 3', status: 'In Progress' },
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

  const columns = ['To Do', 'In Progress', 'Done'];

  return (
    <div style={{ display: 'flex', padding: '16px' }}>
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
