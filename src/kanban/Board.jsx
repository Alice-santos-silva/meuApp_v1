import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import '../App.css'; // Importando o arquivo CSS
import CompModal from '../utils/compModal'; // Importando o modal

const initialCards = [
  { id: 1, text: 'Task 1', status: 'Novo Orçamento', fields: {} },
  { id: 2, text: 'Task 2', status: 'Synoptique e Condições', fields: {} },
  { id: 3, text: 'Task 3', status: 'Montagem do Roteiro', fields: {} },
  { id: 4, text: 'Task 4', status: 'Done', fields: {} },
];

const Board = () => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('kanbanCards');
    return savedCards ? JSON.parse(savedCards) : initialCards;
  });

  const [newCardText, setNewCardText] = useState('');
  const [newCardStatus, setNewCardStatus] = useState('Novo Orçamento');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanbanCards', JSON.stringify(cards));
  }, [cards]);

  const handleDropCard = (id, newStatus) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, status: newStatus } : card
      )
    );
  };


  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      text: newCardText,
      status: newCardStatus,
      fields: {}
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setNewCardText('');
  };

  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const openModal = (card) => {
    setActiveCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveCard(null);
  };

  const updateCardFields = (id, updatedFields) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, fields: updatedFields } : card
      )
    );
  };

  const columns = [
    'Novo Orçamento',
    'Synoptique e Condições',
    'Montagem do Roteiro',
    'Alinhamento de Expectativas',
    'Disponibilidade e Tarifas',
    'Preparação da Cotação',
    'Coleta de Informações para a Proposta',
    'Preparação da Apresentação',
    'Proposta Enviada',
    'Orçamento Confirmado',
    'Orçamento Suspenso'
  ];

  return (
    <div>
      <div className="newCard">
        <input
          type="text"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Digite o texto do novo cartão"
        />
        <select value={newCardStatus} onChange={(e) => setNewCardStatus(e.target.value)}>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <button onClick={handleAddCard}>Adicionar Cartão</button>
      </div>
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            status={column}
            cards={cards.filter((card) => card.status === column)}
            onDropCard={handleDropCard}
            onDeleteCard={handleDeleteCard}
            openModal={openModal}
          />
        ))}
      </div>
      {activeCard && (
        <CompModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          card={activeCard}
          updateCardFields={updateCardFields}
        />
      )}
    </div>
  );
};

export default Board;
