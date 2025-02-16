// File: SentenceInput.js
import React from 'react';
import './SentenceInput.css';

const SentenceInput = ({ sentence, onInputChange }) => {
  return (
    <textarea
      value={sentence}
      onChange={onInputChange}
      placeholder="Type a sentence here..."
      rows="3"
      className="sentence-input"
      style={{ width: '90%', minWidth: '300px' }}  // Inline style forces 90% width with a minimum width
    />
  );
};

export default SentenceInput;
