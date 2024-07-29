import React, { useState, useEffect, createContext } from "react";
import ReactModal from "react-modal";
import { Button, TextField, Typography, IconButton } from '@mui/material';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SaveAsExcelButton from './SaveAsExcelButton';
import '../App.css';

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
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="header-row">
          <Typography variant="h6">Detalhes da Oportunidade</Typography>
          <IconButton onClick={onRequestClose} className="icon">
            <FullscreenExitIcon />
          </IconButton>
        </div>

        {fields.map((field, index) => (
          <div key={index}>
            <TextField
              label={field.label}
              variant="outlined"
              fullWidth
              value={field.input}
              onChange={(e) => handleInputChange(index, e)}
              margin="normal"
            />
            <Typography variant="body2" className="output">{field.output}</Typography>
          </div>
        ))}

        <Button onClick={updateOutputs} variant="contained" color="primary" className="update-button">
          Salvar Alterações
        </Button>
        <SaveAsExcelButton />
      </ReactModal>
    </FieldsContext.Provider>
  );
};

export default CompModal;
