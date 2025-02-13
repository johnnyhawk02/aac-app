import React from 'react';
import './OptionsDialog.css';

const OptionsDialog = ({ options, setOptions, toggleDialog }) => {
  // Handle slider changes
  const handleSliderChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="options-overlay" onClick={toggleDialog}>
      <div className="options-dialog" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        {/* Font Size Slider */}
        <label>Font Size: {options.fontSize}px</label>
        <input
          type="range"
          min="10"
          max="90"  // Small to very big
          step="1"
          value={parseInt(options.fontSize)}
          onChange={(e) => handleSliderChange('fontSize', e.target.value)}
          className="slider"
        />

        {/* Image Size Slider */}
        <label>Image Size: {options.imageSize}px</label>
        <input
          type="range"
          min="20"
          max="200"  // Small to very big
          step="1"
          value={parseInt(options.imageSize)}
          onChange={(e) => handleSliderChange('imageSize', e.target.value)}
          className="slider"
        />

        {/* Monospaced Toggle */}
        <label>
          <input
            type="checkbox"
            checked={options.monospaced}
            onChange={(e) => handleSliderChange('monospaced', e.target.checked)}
          />
          Monospaced Layout
        </label>

        <button onClick={toggleDialog}>Close</button>
      </div>
    </div>
  );
};

export default OptionsDialog;
