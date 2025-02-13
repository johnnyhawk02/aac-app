import React from 'react';

const WordDisplay = ({ processedWords, speakWord, options }) => {
  const fontSizeMap = {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
  };

  const imageSizeMap = {
    small: 40,
    medium: 50,
    large: 60,
  };

  return (
    <div className={`sentence-display ${options.monospaced ? 'monospaced' : ''}`}>
      {processedWords.map((wordObj, idx) => {
        const wordLength = wordObj.text.length;
        const baseWidth = options.monospaced ? 100 : Math.max(50, wordLength * 12);
        const imageSize = imageSizeMap[options.imageSize];

        return (
          <div
            key={idx}
            className="word-container"
            onClick={() => speakWord(wordObj.text)}
            aria-label={`Word: ${wordObj.text}`}
            role="button"
            tabIndex={0}
            style={{ width: `${baseWidth}px` }}
          >
            <img
              src={wordObj.symbol || "images/blank.jpg"}
              alt={wordObj.text}
              className="word-symbol"
              style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "images/blank.jpg";  // Fallback if symbol isn't found
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
