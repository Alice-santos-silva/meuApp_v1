import React, { useState, useEffect, createContext } from "react";
import ReactModal from "react-modal";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import '../App.css';
import SaveAsExcelButton from './SaveAsExcelButton';

ReactModal.setAppElement('#root');

export const FieldsContext = createContext();

const CompModal = ({ isOpen, onRequestClose, card }) => {
  const [fields, setFields] = useState([
    { label: "Nome da Oportunidade:", input: "", output: "" },
    { label: "Número do file:", input: "", output: "" },
    { label: "Nome do grupo:", input: "", output: "" },
    { label: "Agência:", input: "", output: "" },
    { label: "Solicitante:", input: "", output: "" },
    { label: "E-mail:", input: "", output: "" },
    { label: "Número de pax:", input: "", output: "" },
    { label: "Idade dos pax:", input: "", output: "" },
    { label: "Número de noites:", input: "", output: "" }
  ]);

  useEffect(() => {
    if (card) {
      const savedFields = localStorage.getItem(`fields-${card.id}`);
      if (savedFields) {
        setFields(JSON.parse(savedFields));
      } else {
        setFields(fields.map(field => ({
          ...field,
          input: card.text
        })));
      }
    }
  }, [card]);

  const handleInputChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].input = event.target.value;
    setFields(newFields);
    localStorage.setItem(`fields-${card.id}`, JSON.stringify(newFields));
  };

  const updateOutputs = () => {
    const newFields = fields.map(field => ({
      ...field,
      output: field.input
    }));
    setFields(newFields);
    localStorage.setItem(`fields-${card.id}`, JSON.stringify(newFields));
    alert('Alterações salvas!')
  };

  return (
    <FieldsContext.Provider value={{ fields }}>
      <div>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="header-row">
            <h2 id="header">Título do Modal</h2>
            <button onClick={onRequestClose} className="icon"><FullscreenExitIcon /></button>
          </div>

          {fields.map((field, index) => (
            <div key={index}>
              <label>{field.label}</label>
              <input
                type="text"
                className="input"
                value={field.input}
                onChange={(e) => handleInputChange(index, e)}
              />
              <p className="output">{field.output}</p>
            </div>
          ))}

          <button onClick={updateOutputs} className="update-button">Salvar Alterações</button>
          <SaveAsExcelButton />
        </ReactModal>
      </div>
    </FieldsContext.Provider>
  );
};

export default CompModal;
