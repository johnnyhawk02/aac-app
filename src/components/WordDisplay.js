import React from 'react';

const WordDisplay = ({ processedWords, speakWord, options }) => {
  return (
    <div className={`sentence-display ${options.monospaced ? 'monospaced' : ''}`}>
      {processedWords.map((wordObj, idx) => (
        <div
          key={idx}
          className="word-container"
          onClick={() => speakWord(wordObj.text)}
        >
          <img
            src={`/images/symbols/${wordObj.text[0]}/${wordObj.text}.jpg`} // Remove process.env.PUBLIC_URL
            alt={wordObj.text}
            className="word-symbol"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/blank.jpg";
            }}
            style={{ width: `${options.imageSize}px`, height: `${options.imageSize}px` }}
          />

          <div
            className="word-text"
            style={{ fontSize: `${options.fontSize}px` }}  // Apply font size here
          >
            {wordObj.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;
