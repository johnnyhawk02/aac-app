import React from 'react';
import { FaPrint, FaCog, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import './AppBar.css';

const AppBar = ({ handlePrint, toggleOptions, toggleSearch, toggleHelp }) => {
  return (
    <div className="app-bar">
      <div className="app-title">🧠 Makky</div>

      <div className="app-icons">
        <div className="icon-button" onClick={toggleOptions} title="Settings">
          <FaCog />
          <div className="icon-label">Settings</div>
        </div>

        <div className="icon-button" onClick={handlePrint} title="Print">
          <FaPrint />
          <div className="icon-label">Print</div>
        </div>

        <div className="icon-button" onClick={toggleSearch} title="Search">
          <FaSearch />
          <div className="icon-label">Search</div>
        </div>

        <div className="icon-button" onClick={toggleHelp} title="Help">
          <FaQuestionCircle />
          <div className="icon-label">Help</div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
