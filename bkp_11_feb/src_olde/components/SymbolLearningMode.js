import React, { useState, useEffect, useCallback } from 'react';
import './SymbolLearningMode.css';

const SymbolLearningMode = ({ symbolsData, exitLearningMode }) => {
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Memoize loadNewQuestion to avoid unnecessary re-creations
  const loadNewQuestion = useCallback(() => {
    // Filter out symbols that contain numbers in their phrase
    const filteredSymbols = symbolsData.filter(item => !/\d/.test(item.phrase));

    if (filteredSymbols.length === 0) {
      setFeedback("No symbols available without numbers.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredSymbols.length);
    const selectedSymbol = filteredSymbols[randomIndex];
    const correctWord = selectedSymbol.phrase;

    // Generate distractors
    const otherOptions = filteredSymbols
      .filter(item => item.phrase !== correctWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(item => item.phrase);

    const shuffledOptions = [...otherOptions, correctWord].sort(() => 0.5 - Math.random());

    setCurrentSymbol(selectedSymbol);
    setOptions(shuffledOptions);
    setFeedback("");
  }, [symbolsData]);

  useEffect(() => {
    if (symbolsData.length > 0) {
      loadNewQuestion();
    }
  }, [symbolsData, loadNewQuestion]);

  const handleAnswer = (selectedWord) => {
    setAttempts(prev => prev + 1);
    if (selectedWord === currentSymbol.phrase) {
      setScore(prev => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Oops! The correct answer was "${currentSymbol.phrase}".`);
    }

    setTimeout(() => {
      loadNewQuestion();
    }, 1500);
  };

  return (
    <div className="learning-mode-container">
      <h2>Symbol Learning Mode</h2>
      <div className="scoreboard">
        Score: {score} / {attempts}
      </div>

      {currentSymbol && (
        <div className="symbol-question">
          <img
            src={`images/symbols/${currentSymbol.phrase[0].toLowerCase()}/${currentSymbol.phrase.replace(/ /g, "_").toLowerCase()}.jpg`}
            alt={currentSymbol.phrase}
            className="learning-symbol"
          />
          <div className="options-container">
            {options.map((option, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="feedback">{feedback}</div>

      <button className="exit-button" onClick={exitLearningMode}>
        Exit Learning Mode
      </button>
    </div>
  );
};

export default SymbolLearningMode;
