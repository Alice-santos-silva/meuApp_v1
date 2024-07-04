import React from 'react';
import Card from './Card';

const Column = ({ column, cards, onCardDrop, onRemoveColumn, onAddCard, onCardClick }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    onCardDrop(cardId, column.id);
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{column.title}</h2>
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
      ))}
      <div className="add-card">
        <button onClick={onAddCard}>Adicionar Cartão</button>
      </div>
      <button onClick={() => onRemoveColumn(column.id)}>Remover Coluna</button>
    </div>
  );
};

export default Column;
