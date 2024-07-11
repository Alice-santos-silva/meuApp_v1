import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

const initialCards = [
  { id: 1, text: 'Task 1', status: 'Novo Orçamento' },
  { id: 2, text: 'Task 2', status: 'Synoptique e Condições' },
  { id: 3, text: 'Task 3', status: 'Montagem do Roteiro' },
  { id: 4, text: 'Task 4', status: 'Done' },
];

const Board = () => {
  const [cards, setCards] = useState(() => {
    // Carregar dados do localStorage ou usar initialCards
    const savedCards = localStorage.getItem('kanbanCards');
    return savedCards ? JSON.parse(savedCards) : initialCards;
  });

  const [newCardText, setNewCardText] = useState('');
  const [newCardStatus, setNewCardStatus] = useState('Novo Orçamento');

  // Salvar dados no localStorage sempre que cards mudar
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
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setNewCardText(''); // Limpa o campo de texto do novo cartão
  };

  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
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
      <div style={{backgroundColor:'#489cef', padding:'10px', display:'flex', justifyContent:'center', alignItems:'center', height:'80px'}}>
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
      <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', padding: '16px' }}>
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            status={column}
            cards={cards.filter((card) => card.status === column)}
            onDropCard={handleDropCard}
            onDeleteCard={handleDeleteCard} // Passa a função de deletar para a coluna
          />
        ))}
      </div>
    </div>
  );
};

export default Board;