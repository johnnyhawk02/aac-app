// File: ImageUpload.js
import React from 'react';
import './ImageUpload.css';
import ResizableImage from './ResizableImage'; // If you're using the resizable component

const ImageUpload = ({ imageSrc }) => {
  return (
    <div className="image-upload">
      {imageSrc && (
        <>
          <ResizableImage src={imageSrc} alt="Uploaded" initialWidth={300} />
        </>
      )}
    </div>
  );
};

export default ImageUpload;
