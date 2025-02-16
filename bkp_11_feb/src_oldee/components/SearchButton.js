// File: SearchButton.js
import React from 'react';

const SearchButton = ({ openDialog }) => {
  return (
    <button className="search-button" onClick={openDialog}>
      🔍 Search
    </button>
  );
};

export default SearchButton;
