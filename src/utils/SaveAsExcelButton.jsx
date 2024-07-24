import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { FieldsContext } from './compModal';

const SaveAsExcelButton = () => {
  const { fields } = useContext(FieldsContext);

  const saveAsExcel = () => {
    // Cria um objeto com os labels como cabeçalhos de coluna
    const headers = fields.reduce((acc, field, index) => {
      acc[field.label.replace(":", "")] = field.input;
      return acc;
    }, {});

    const wsData = [headers];

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };


  
  return <button onClick={saveAsExcel}>Salvar como Planilha</button>;
};

export default SaveAsExcelButton;
