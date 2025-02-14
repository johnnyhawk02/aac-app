import React from 'react';
import './OptionsDialog.css';

const OptionsDialog = ({ options, setOptions, toggleDialog }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="options-dialog">
      <h2>Settings</h2>

      <label>
        Font Size:
        <select name="fontSize" value={options.fontSize} onChange={handleChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        Image Size:
        <select name="imageSize" value={options.imageSize} onChange={handleChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        Monospaced Layout:
        <input
          type="checkbox"
          name="monospaced"
          checked={options.monospaced}
          onChange={handleChange}
        />
      </label>

      <button onClick={toggleDialog}>Close</button>
    </div>
  );
};

export default OptionsDialog;
