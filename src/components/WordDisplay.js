import React from 'react';

const WordDisplay = ({ processedWords, speakWord, options }) => {
  return (
    <div className={`sentence-display ${options.monospaced ? 'monospaced' : ''}`}>
      {processedWords.map((wordObj, idx) => (
        <div
          key={idx}
          className="word-container"
          onClick={() => speakWord(wordObj.text)}
          style={{ fontSize: `${options.fontSize}px` }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/symbols/${wordObj.text[0]}/${wordObj.text}.jpg`}  // Corrected path
            alt={wordObj.text}
            className="word-symbol"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/images/blank.jpg`;  // Fallback image
            }}
            style={{ width: `${options.imageSize}px`, height: `${options.imageSize}px` }}
          />
          <div className="word-text">{wordObj.text}</div>
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;
