// File: WordDisplay.js
import React from 'react';

const WordDisplay = ({ processedWords, speakWord, options }) => {
  // Mapping for font sizes (in rem) based on numeric keys
  const fontSizeMap = {
    40: '0.8rem',
    60: '1.0rem',
    80: '1.2rem',
    100: '1.4rem',
    120: '1.6rem',
    140: '1.8rem',
  };

  // Mapping for image sizes in pixels (keys match options values)
  const imageSizeMap = {
    40: 40,
    60: 60,
    80: 80,
    100: 100,
    120: 120,
    140: 140,
  };

  return (
    <div className="sentence-display">
      {processedWords.map((wordObj, idx) => {
        // Get a base font size from CSS or use 16 as fallback
        const baseFontSize =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--font-size')
          ) || 16;
        // Estimate the text width
        const textWidth = wordObj.text.length * baseFontSize;
        // Get the image size from the mapping
        const imageSize = imageSizeMap[options.imageSize];
        // Determine container width: greater of textWidth or imageSize, plus some padding (30px here)
        const containerWidth = Math.max(textWidth, imageSize) + 30;

        return (
          <div
            key={idx}
            className="word-container"
            onClick={() => speakWord(wordObj.text)}
            aria-label={`Word: ${wordObj.text}`}
            role="button"
            tabIndex={0}
            style={{ width: `${containerWidth}px` }}
          >
            <img
              src={wordObj.icon || "images/blank.jpg"}
              alt={wordObj.text}
              className="word-symbol"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "images/blank.jpg";
              }}
            />
            <div className="word-text" style={{ fontSize: fontSizeMap[options.fontSize] }}>
              {wordObj.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
