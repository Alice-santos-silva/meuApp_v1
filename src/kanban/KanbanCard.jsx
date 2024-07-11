import React from 'react';
import { useDrag } from 'react-dnd';

const KanbanCard = ({ id, text, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        backgroundColor: 'white',
        border: '1px solid gray',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        position: 'relative', // Necessário para posicionar o botão de exclusão
      }}
    >
      {text}
      <button
        onClick={() => onDelete(id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  );
};

export default KanbanCard;