import React from 'react';
// import './SentenceInput.css';  // Remove this line if styles are in App.css

const SentenceInput = ({ sentence, onInputChange }) => {
  return (
    <div>
      <textarea
        value={sentence}
        onChange={onInputChange}
        placeholder="Type a sentence here..."
        rows="3"
        className="sentence-input"
      />
    </div>
  );
};

export default SentenceInput;
