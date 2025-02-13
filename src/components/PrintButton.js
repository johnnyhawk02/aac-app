import React from 'react';

const PrintButton = ({ handlePrint }) => {
  return (
    <div className="button-container">
      <button onClick={handlePrint} className="print-button">
        Print Board
      </button>
    </div>
  );
};

export default PrintButton;
