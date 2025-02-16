import React, { useState } from 'react';
import './EditSymbolDialog.css';

const EditSymbolDialog = ({ word, currentSymbol, availableSymbols, saveCustomSymbol, closeDialog }) => {
  const [selectedSymbol, setSelectedSymbol] = useState(currentSymbol);

  const handleSave = () => {
    saveCustomSymbol(word, selectedSymbol);
    closeDialog();
  };

  return (
    <div className="edit-symbol-dialog">
      <h2>Edit Symbol for "{word}"</h2>
      <div className="symbol-preview">
        <img
          src={`images/symbols/${selectedSymbol[0].toLowerCase()}/${selectedSymbol}.jpg`}
          alt={selectedSymbol}
          className="symbol-preview-img"
        />
      </div>

      <label>
        Choose a different symbol:
        <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
          {availableSymbols.map((symbol, idx) => (
            <option key={idx} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </label>

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={closeDialog}>Cancel</button>
      </div>
    </div>
  );
};

export default EditSymbolDialog;
