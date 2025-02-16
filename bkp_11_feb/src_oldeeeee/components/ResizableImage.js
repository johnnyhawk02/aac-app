// File: ResizableImage.js
import React, { useState, useRef, useEffect } from 'react';
import './ResizableImage.css';

const ResizableImage = ({ src, alt, initialWidth = 300, initialHeight = null, onResize }) => {
  // If initialHeight isn't provided, we'll calculate it later based on the image's aspect ratio.
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight || 'auto' });
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const isResizing = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // When the user presses down on the handle, start resizing.
  const onMouseDown = (e) => {
    isResizing.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isResizing.current) return;
    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;
    setDimensions((prev) => {
      // For simplicity, we'll adjust width and height proportionally.
      // You might choose to use only dx to adjust width, then recalc height via the natural aspect ratio.
      const newWidth = Math.max(prev.width + dx, 50); // minimum width of 50px
      // Calculate new height based on the image's natural aspect ratio.
      const aspectRatio = imageRef.current ? imageRef.current.naturalHeight / imageRef.current.naturalWidth : 1;
      const newHeight = newWidth * aspectRatio;
      return { width: newWidth, height: newHeight };
    });
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (onResize) {
      onResize(dimensions);
    }
  };

  // Once the image loads, if no explicit height was provided, calculate it using the natural aspect ratio.
  useEffect(() => {
    if (imageRef.current && dimensions.height === 'auto') {
      const ratio = imageRef.current.naturalHeight / imageRef.current.naturalWidth;
      setDimensions({ width: dimensions.width, height: dimensions.width * ratio });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef.current]);

  return (
    <div 
      className="resizable-image-container" 
      ref={containerRef} 
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
      <div className="resizer-handle" onMouseDown={onMouseDown} />
    </div>
  );
};

export default ResizableImage;
