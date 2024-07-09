import React from 'react';
import { useDrop } from 'react-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ status, cards, onDropCard }) => {
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
        display: 'inline-block', // Adicionando inline-block para manter colunas inline
        verticalAlign: 'top', // Alinhamento vertical das colunas
        minWidth: '300px',
        marginRight: '16px',
        flexShrink: 0, // Impede que as colunas se comprimam
        padding: '16px',
        backgroundColor: isOver ? '#e0ffe0' : '#f0f0f0',
        minHeight: '400px',
        border: '1px solid gray',
      }}
    >
      <h2>{status}</h2>
      {cards.map((card) => (
        <KanbanCard key={card.id} id={card.id} text={card.text} />
      ))}
    </div>
  );
};

export default KanbanColumn;
