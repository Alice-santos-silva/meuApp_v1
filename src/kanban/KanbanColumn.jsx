import React from 'react';
import { useDrop } from 'react-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ status, cards, onDropCard, onDeleteCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onDropCard(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        display: 'inline-block',
        verticalAlign: 'top',
        minWidth: '300px',
        marginRight: '16px',
        flexShrink: 0,
        padding: '16px',
        backgroundColor: isOver ? '#e0ffe0' : '#f0f0f0',
        minHeight: '400px',
        border: '1px solid gray',
        borderRadius: '10px',
        textAlign: 'center',
        overflowY: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <h2>{status}</h2>
      {cards.map((card) => (
        <KanbanCard key={card.id} id={card.id} text={card.text} onDelete={onDeleteCard} />
      ))}
    </div>
  );
};

export default KanbanColumn;