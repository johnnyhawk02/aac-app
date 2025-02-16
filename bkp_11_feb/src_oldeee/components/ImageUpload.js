// File: ImageUpload.js
import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ setImageSrc }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageSrc(imageUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageSrc(null);
  };

  return (
    <div className="image-upload">
      {!image && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
      )}

      {image && (
        <>
          <img src={image} alt="Uploaded" className="uploaded-image" />
          <button onClick={removeImage} className="remove-image-btn">Remove Image</button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
