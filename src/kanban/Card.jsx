import React from 'react';

const Card = ({ card, onClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  return (
    <div className="card" draggable onDragStart={handleDragStart} onClick={onClick}>
      <p>{card.title}</p>
    </div>
  );
};

export default Card;
