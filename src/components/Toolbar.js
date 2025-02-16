// File: components/Toolbar.js
import React from 'react';
import { FaPrint, FaSearch, FaGraduationCap, FaQuestionCircle } from 'react-icons/fa';

const Toolbar = ({ handlePrint, toggleSearch, toggleLearningMode, toggleHelp, options, setOptions }) => {
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Handle monospaced toggle
  const handleMonospacedToggle = () => {
    setOptions((prev) => ({ ...prev, monospaced: !prev.monospaced }));
  };

  return (
    <div className="toolbar">
      {/* Font Size Slider */}
      <div className="slider-group">
        <label>Font Size:</label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          name="fontSize"
          value={options.fontSize}
          onChange={handleSliderChange}
        />
      </div>

      {/* Image Size Slider */}
      <div className="slider-group">
        <label>Image Size:</label>
        <input
          type="range"
          min="30"
          max="300"
          step="10"
          name="imageSize"
          value={options.imageSize}
          onChange={handleSliderChange}
        />
      </div>

      {/* Monospaced Toggle */}
      <div className="toggle-group">
        <label>Monospaced:</label>
        <input
          type="checkbox"
          checked={options.monospaced}
          onChange={handleMonospacedToggle}
        />
      </div>

      {/* Action Buttons */}
      <div className="icon-buttons">
        <button onClick={handlePrint} title="Print">
          <FaPrint />
        </button>
        <button onClick={toggleSearch} title="Search">
          <FaSearch />
        </button>
        <button onClick={toggleLearningMode} title="Learning Mode">
          <FaGraduationCap />
        </button>
        <button onClick={toggleHelp} title="Help">
          <FaQuestionCircle />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
