import React from 'react';
import './OptionsDialog.css';

const sizes = [40, 60, 80, 100, 120, 140];
const fontSizeLabels = {
  40: '0.8rem',
  60: '1.0rem',
  80: '1.2rem',
  100: '1.4rem',
  120: '1.6rem',
  140: '1.8rem',
};

const OptionsDialog = ({ options, setOptions, toggleDialog }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  return (
    <div className="options-dialog">
      <h2>Settings</h2>

      <label>
        Font Size:
        <select name="fontSize" value={options.fontSize} onChange={handleChange}>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {fontSizeLabels[size]}
            </option>
          ))}
        </select>
      </label>

      <label>
        Image Size:
        <select name="imageSize" value={options.imageSize} onChange={handleChange}>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </label>

      <button onClick={toggleDialog}>Close</button>
    </div>
  );
};

export default OptionsDialog;
