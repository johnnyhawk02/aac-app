import React, { useEffect, useRef, useState } from 'react';
import './SearchDialog.css';

const SearchDialog = ({ symbols, insertWord, closeDialog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Focus the input box when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.phrase.toLowerCase().startsWith(searchTerm)
  );

  return (
    <div className="search-dialog">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search symbols..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="symbol-list">
        {filteredSymbols.length > 0 ? (
          filteredSymbols.map((symbol) => (
            <div
              key={symbol.phrase}
              className="symbol-item"
              onClick={() => insertWord(symbol.phrase.replace(/\s+/g, "_"))}
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
