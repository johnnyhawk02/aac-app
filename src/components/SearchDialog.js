// File: SearchDialog.js
import React, { useState } from 'react';
import './SearchDialog.css';


const SearchDialog = ({ symbols, insertWord, closeDialog }) => {
  const [query, setQuery] = useState('');

  // Filter symbols where the phrase starts with the query
  const filteredSymbols = symbols.filter((symbol) =>
    symbol?.phrase?.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSymbolClick = (symbol) => {
    insertWord(symbol.phrase);
    closeDialog();
  };

  return (
    <div className="search-dialog">
      <input
        type="text"
        placeholder="Search for a symbol..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="symbol-list">
        {filteredSymbols.length > 0 ? (
          filteredSymbols.map((symbol) => (
            <div
              key={symbol.phrase}
              className="symbol-item"
              onClick={() => handleSymbolClick(symbol)}
            >
              <img src={symbol.icon} alt={symbol.phrase} />
              <span>{symbol.phrase}</span>
            </div>
          ))
        ) : (
          <div className="no-results">No symbols found</div>
        )}
      </div>
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};

export default SearchDialog;
