import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import KanbanCard from './KanbanCard';
import CompModal from '../utils/compModal';
import '../App.css'; // Importando o arquivo CSS

const KanbanColumn = ({ status, cards, onDropCard, onDeleteCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onDropCard(item.id, status), // Chamando a função ao soltar o card
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const openModal = (card) => {
    setActiveCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveCard(null);
  };

  return (
    <div
      ref={drop}
      className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}
    >
      <h2>{status}</h2>
      {cards.map((card) => (
        <KanbanCard
          key={card.id}
          id={card.id}
          text={card.text}
          onDelete={onDeleteCard}
          openModal={openModal} // Passando a função de abrir o modal para o card
        />
      ))}
      {activeCard && (
        <CompModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          card={activeCard}
        />
      )}
    </div>
  );
};

export default KanbanColumn;
