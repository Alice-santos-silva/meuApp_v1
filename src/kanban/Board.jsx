import React, { useState } from 'react';
import Column from './Column';
import Modal from 'react-modal';

const Board = () => {
  const [cards, setCards] = useState([
    { id: '1', title: 'Tarefa 1', columnId: '1', agencyName: '', peopleNumber: '' },
    { id: '2', title: 'Tarefa 2', columnId: '2', agencyName: '', peopleNumber: '' },
    { id: '3', title: 'Tarefa 3', columnId: '3', agencyName: '', peopleNumber: '' },
  ]);

  const [columns, setColumns] = useState([
    { id: '1', title: 'Novo Orçamento' },
    { id: '2', title: 'Synoptique e condições'},
    { id: '3', title: 'Montagem do Roteiro' },
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', agencyName: '', peopleNumber: '', columnId: '' });
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardDrop = (cardId, newColumnId) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, columnId: newColumnId } : card
    ));
  };

  const handleAddColumn = () => {
    const newColumn = {
      id: (columns.length + 1).toString(),
      title: newColumnTitle
    };
    setColumns([...columns, newColumn]);
    setNewColumnTitle('');
  };

  const handleRemoveColumn = (columnId) => {
    setColumns(columns.filter(column => column.id !== columnId));
    setCards(cards.filter(card => card.columnId !== columnId));
  };

  const handleOpenModal = (columnId) => {
    setNewCard({ ...newCard, columnId });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleAddCard = () => {
    const newCardData = {
      id: (cards.length + 1).toString(),
      ...newCard,
    };
    setCards([...cards, newCardData]);
    setNewCard({ title: '', agencyName: '', peopleNumber: '', columnId: '' });
    handleCloseModal();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseCardModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="board">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          cards={cards.filter(card => card.columnId === column.id)}
          onCardDrop={handleCardDrop}
          onRemoveColumn={handleRemoveColumn}
          onAddCard={() => handleOpenModal(column.id)}
          onCardClick={handleCardClick}
        />
      ))}
      <div className="add-column">
        <input 
          type="text" 
          value={newColumnTitle} 
          onChange={e => setNewColumnTitle(e.target.value)} 
          placeholder="Nova Coluna"
        />
        <button onClick={handleAddColumn}>Adicionar Coluna</button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h2>Novo Cartão</h2>
        <input 
          type="text" 
          value={newCard.title} 
          onChange={e => setNewCard({ ...newCard, title: e.target.value })} 
          placeholder="nº file"
        />
        <input 
          type="text" 
          value={newCard.agencyName} 
          onChange={e => setNewCard({ ...newCard, agencyName: e.target.value })} 
          placeholder="Nome do grupo"
        />
        <input 
          type="text" 
          value={newCard.peopleNumber} 
          onChange={e => setNewCard({ ...newCard, peopleNumber: e.target.value })} 
          placeholder="Nome da Agência"
        />
        <button onClick={handleAddCard}>Adicionar Cartão</button>
        <button onClick={handleCloseModal}>Fechar</button>
      </Modal>
      {selectedCard && (
        <Modal isOpen={true} onRequestClose={handleCloseCardModal}>
          <h2>Detalhes do Cartão</h2>
          <p><strong>Título:</strong> {selectedCard.title}</p>
          <p><strong>Nome da Agência:</strong> {selectedCard.agencyName}</p>
          <p><strong>Número de Pessoas:</strong> {selectedCard.peopleNumber}</p>
          <button onClick={handleCloseCardModal}>Fechar</button>
        </Modal>
      )}
    </div>
  );
};

export default Board;