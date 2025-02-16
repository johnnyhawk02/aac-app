// File: AppBar.js
import React, { useRef } from 'react';
import {
  FaPrint,
  FaCog,
  FaSearch,
  FaQuestionCircle,
  FaTrash,
  FaFileUpload,
} from 'react-icons/fa';
import SentenceInput from './SentenceInput';
import './AppBar.css';

const AppBar = ({
  handlePrint,
  toggleOptions,
  toggleLearningMode,
  toggleHelp,
  toggleSearch,
  removeImage,
  setImageSrc,
  sentence,
  onInputChange,
}) => {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div className="app-bar">
      <div className="app-header-row">
        <div className="left-icons">
          <div className="icon-button" onClick={toggleSearch} title="Search Symbol">
            <FaSearch />
            <div className="icon-label">Search Symbol</div>
          </div>
          <div className="icon-button" onClick={toggleLearningMode} title="Guess">
            <FaQuestionCircle />
            <div className="icon-label">Guess</div>
          </div>
          <div className="icon-button" onClick={handleFileInputClick} title="Import Image">
            <FaFileUpload />
            <div className="icon-label">Import Image</div>
          </div>
          <div className="icon-button" onClick={removeImage} title="Remove Image">
            <FaTrash />
            <div className="icon-label">Remove</div>
          </div>
        </div>
        <div className="right-icons">
          <div className="icon-button" onClick={toggleOptions} title="Settings">
            <FaCog />
            <div className="icon-label">Settings</div>
          </div>
          <div className="icon-button" onClick={handlePrint} title="Print">
            <FaPrint />
            <div className="icon-label">Print</div>
          </div>
          <div className="icon-button" onClick={toggleHelp} title="Help">
            <FaQuestionCircle />
            <div className="icon-label">Help</div>
          </div>
        </div>
      </div>
      <div className="app-sentence-input">
        <SentenceInput sentence={sentence} onInputChange={onInputChange} />
      </div>
      {/* Hidden file input for importing images */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AppBar;
