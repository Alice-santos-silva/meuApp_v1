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

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevenir que o clique no botão delete abra o modal
    const confirmDelete = window.confirm("Você tem certeza que deseja deletar este card?");
    if (confirmDelete) {
      onDelete(id);
    }
  };


  return (
    <div
      ref={drag}
      className="kanban-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => openModal({ id, text })} // Chamando a função quando o card é clicado
    >
      
      <button
        onClick={handleDelete}
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
        {text}
      </button>
    </div>
  );
};

export default KanbanCard;



