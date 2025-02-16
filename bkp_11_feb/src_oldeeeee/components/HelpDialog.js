import React from 'react';
import './HelpDialog.css';

const HelpDialog = ({ toggleDialog }) => {
  return (
    <div className="help-overlay" onClick={toggleDialog}>
      <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
        <h2>How to Use the AAC Communication Board</h2>
        <ul>
          <li><strong>Type a Sentence:</strong> Enter your sentence in the text box. Symbols will automatically appear above each word.</li>
          <li><strong>Edit Symbols:</strong> Use brackets to assign symbols to specific words (e.g., typing <em>evil(bad)</em> will display the word "evil" with the symbol for "bad").</li>
          <li><strong>Edit Title:</strong> Customize your sentence title using the title input below the text box.</li>
          <li><strong>Learning Mode:</strong> Click the school icon to enter Symbol Learning Mode for interactive symbol matching.</li>
          <li><strong>Print:</strong> Click the print icon to print your sentence and symbols.</li>
          <li><strong>Settings:</strong> Click the settings icon to adjust font size, image size, or enable monospaced layout.</li>
        </ul>
        <button onClick={toggleDialog}>Close</button>
      </div>
    </div>
  );
};

export default HelpDialog;
