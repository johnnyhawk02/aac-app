import React from 'react';
import './AppBar.css';

const AppBar = ({ handlePrint, toggleOptions, toggleLearningMode, toggleHelp }) => {
  return (
    <div className="app-bar">
      <div className="app-title">AAC Communication Board</div>
      <div className="app-icons">
        <span className="material-icons icon-button" onClick={toggleLearningMode} title="Learning Mode">
          school
        </span>
        <span className="material-icons icon-button" onClick={toggleOptions} title="Settings">
          settings
        </span>
        <span className="material-icons icon-button" onClick={handlePrint} title="Print">
          print
        </span>
        <span className="material-icons icon-button" onClick={toggleHelp} title="Help">
          help_outline
        </span>
      </div>
    </div>
  );
};

export default AppBar;
