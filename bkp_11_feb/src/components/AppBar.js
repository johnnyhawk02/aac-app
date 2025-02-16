// File: AppBar.js
import React, { useRef } from 'react';
import {
  FaCog,
  FaSearch,
  FaQuestionCircle,
  FaTrash,
  FaFileUpload,
  FaDownload,
} from 'react-icons/fa';
import SentenceInput from './SentenceInput';
import './AppBar.css';

const AppBar = ({
  toggleSearch,
  toggleLearningMode,
  toggleHelp,
  removeImage,
  setImageSrc,
  sentence,
  onInputChange,
  onExport,
  options,
  setOptions,
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
    e.target.value = '';
  };

  // Handler for settings changes (for inline settings panel)
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  return (
    <div className="app-bar">
      <div className="app-header-row">
        <div className="left-icons">

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
          <div className="icon-button" onClick={onExport} title="Export">
            <FaDownload />
            <div className="icon-label">Export</div>
          </div>
          <div className="icon-button" onClick={toggleHelp} title="Help">
            <FaQuestionCircle />
            <div className="icon-label">Help</div>
          </div>
          <div className="icon-button">
            <FaCog />
            <div className="icon-label">Settings</div>
          </div>
        </div>
      </div>

      {/* Always visible settings panel */}
      <div className="settings-panel">
        <div className="setting-row">
          <label htmlFor="fontSize">Font Size:</label>
          <select
            id="fontSize"
            name="fontSize"
            value={options.fontSize}
            onChange={handleSettingChange}
          >
            <option value="40">0.8rem</option>
            <option value="60">1.0rem</option>
            <option value="80">1.2rem</option>
            <option value="100">1.4rem</option>
            <option value="120">1.6rem</option>
            <option value="140">1.8rem</option>
          </select>
        </div>
        <div className="setting-row">
          <label htmlFor="imageSize">Image Size:</label>
          <select
            id="imageSize"
            name="imageSize"
            value={options.imageSize}
            onChange={handleSettingChange}
          >
            <option value="40">40px</option>
            <option value="60">60px</option>
            <option value="80">80px</option>
            <option value="100">100px</option>
            <option value="120">120px</option>
            <option value="140">140px</option>
          </select>
        </div>
        <div className="setting-row">
          <label htmlFor="tilePadding">Tile Padding:</label>
          <input
            type="range"
            id="tilePadding"
            name="tilePadding"
            min="0"
            max="30"
            step="1"
            value={options.tilePadding}
            onChange={handleSettingChange}
          />
          <span>{options.tilePadding}px</span>
        </div>
        <div className="setting-row">
          <label htmlFor="tileGap">Tile Gap:</label>
          <input
            type="range"
            id="tileGap"
            name="tileGap"
            min="0"
            max="50"
            step="1"
            value={options.tileGap}
            onChange={handleSettingChange}
          />
          <span>{options.tileGap}px</span>
        </div>
        <div className="setting-row">
          <label htmlFor="imageSymbolGap">Image-Symbol Gap:</label>
          <input
            type="range"
            id="imageSymbolGap"
            name="imageSymbolGap"
            min="0"
            max="100"
            step="1"
            value={options.imageSymbolGap}
            onChange={handleSettingChange}
          />
          <span>{options.imageSymbolGap}px</span>
        </div>
      </div>

      <div className="app-sentence-input">
        <SentenceInput sentence={sentence} onInputChange={onInputChange} />
      </div>
      {/* Hidden file input */}
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
