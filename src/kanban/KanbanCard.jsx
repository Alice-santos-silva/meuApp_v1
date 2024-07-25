import React from 'react';
import { useDrag } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import '../App.css'; // Importando o arquivo CSS

const KanbanCard = ({ id, text, onDelete, openModal }) => {
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
      className="kanban-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => openModal({ id, text })} // Chamando a função quando o card é clicado
    >
      {text}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevenir que o clique no botão delete abra o modal
          onDelete(id);
        }}
        className="delete-button"
      >
        <DeleteIcon fontSize="small"/>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevenir que o clique no botão delete abra o modal
          openModal({ id, text });
        }}
        className="open-modal-button"
      >
        <FullscreenIcon fontSize="small"/>
      </button>
    </div>
  );
};

export default KanbanCard;