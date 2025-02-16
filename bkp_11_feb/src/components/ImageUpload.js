// File: ImageUpload.js
import React from 'react';
import './ImageUpload.css';

const ImageUpload = ({ imageSrc }) => {
  return (
    <div className="image-upload">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="uploaded-image"
          draggable="false"
        />
      )}
    </div>
  );
};

export default ImageUpload;
