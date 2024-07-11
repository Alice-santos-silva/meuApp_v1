import React from 'react';
import { useDrag } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
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
        minHeight: '50px'
      }}
    >
      {text}
      <button
        onClick={() => onDelete(id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#1976D2',
          color: 'white',
          border: 'none',
          
          minWidth: '20px',
          minHeight: '20px',
          cursor: 'pointer',
          
        }}
      >
       <DeleteIcon/>
      </button>
    </div>
  );
};

export default KanbanCard;