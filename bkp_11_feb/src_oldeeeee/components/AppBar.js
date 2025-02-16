// File: AppBar.js
import React, { useRef } from 'react';
import { FaPrint, FaCog, FaSearch, FaQuestionCircle, FaTrash, FaFileUpload } from 'react-icons/fa';
import './AppBar.css';

const AppBar = ({
  handlePrint,
  toggleOptions,
  toggleLearningMode,
  toggleHelp,
  toggleSearch,
  removeImage,
  setImageSrc,
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

        {/* Search button for toggling search dialog */}
        <div className="icon-button" onClick={toggleSearch} title="Search">
          <FaSearch />
          <div className="icon-label">Search</div>
        </div>

        {/* Optional: Separate icon for Learning Mode if needed */}
        <div className="icon-button" onClick={toggleLearningMode} title="Learning Mode">
          <FaSearch style={{ opacity: 0.5 }} />
          <div className="icon-label">Learning</div>
        </div>

        <div className="icon-button" onClick={toggleHelp} title="Help">
          <FaQuestionCircle />
          <div className="icon-label">Help</div>
        </div>

        <div className="icon-button" onClick={removeImage} title="Remove Image">
          <FaTrash />
          <div className="icon-label">Remove Image</div>
        </div>

        <div className="icon-button" onClick={handleFileInputClick} title="Upload Image">
          <FaFileUpload />
          <div className="icon-label">Upload Image</div>
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
    </div>
  );
};

export default AppBar;
