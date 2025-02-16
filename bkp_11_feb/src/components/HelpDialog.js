// File: HelpDialog.js
import React from 'react';
import './HelpDialog.css';

const HelpDialog = ({ toggleDialog }) => {
  return (
    <div className="help-overlay" onClick={toggleDialog}>
      <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
        <h2>How to Use the AAC Communication Board</h2>
        <ul>
          <li>
            <strong>Type a Sentence:</strong> Use the input field (located under the top bar) to type your sentence. As you type, each word automatically converts into a symbol.
          </li>
          <li>
            <strong>Upload an Image:</strong> Click the <em>Upload Image</em> icon in the top bar to choose an image from your device. This image will be displayed on your board.
          </li>
          <li>
            <strong>Remove Image:</strong> If you want to clear the uploaded image, click the <em>Remove Image</em> icon in the top bar.
          </li>
          <li>
            <strong>Search Symbols:</strong> Use the <em>Search</em> icon in the top bar to open the search dialog, where you can find and insert symbols into your sentence.
          </li>
          <li>
            <strong>Settings:</strong> Click the <em>Settings</em> icon to adjust options such as font size, image size, or to enable a monospaced layout.
          </li>
          <li>
            <strong>Learning Mode:</strong> Activate Learning Mode by clicking the respective icon to practice symbol recognition interactively.
          </li>
          <li>
            <strong>Print:</strong> Click the <em>Print</em> icon to print your current AAC board.
          </li>
        </ul>
        <button onClick={toggleDialog}>Close</button>
      </div>
    </div>
  );
};

export default HelpDialog;
