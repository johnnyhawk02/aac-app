import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './components/WordDisplay';
import SentenceInput from './components/SentenceInput';
import OptionsDialog from './components/OptionsDialog';
import SymbolLearningMode from './components/SymbolLearningMode';
import AppBar from './components/AppBar';
import HelpDialog from './components/HelpDialog';  // Import HelpDialog

function App() {
  const [sentence, setSentence] = useState("");
  const [processedWords, setProcessedWords] = useState([]);
  const [multiWordSymbols, setMultiWordSymbols] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);  // Help dialog state
  const [learningMode, setLearningMode] = useState(false);
  const [title, setTitle] = useState("");  // Editable title
  const [options, setOptions] = useState({
    fontSize: 'medium',
    imageSize: 'medium',
    monospaced: false,
  });

  useEffect(() => {
    fetch('/multiword_symbols.json')
      .then(res => res.json())
      .then(data => setMultiWordSymbols(data))
      .catch(err => console.error(err));
  }, []);

  const processInput = (input) => {
    let modSentence = input;
    multiWordSymbols.forEach(item => {
      const regex = new RegExp(`\\b${item.phrase}\\b`, "gi");
      modSentence = modSentence.replace(regex, item.phrase.replace(/ /g, "_"));
    });

    const tokens = modSentence.split(" ");
    const processed = tokens.map(token => {
      const cleanToken = token.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();

      if (token.includes("(") && !token.includes(")")) {
        const displayText = token.split("(")[0];
        return { text: displayText, symbol: "images/blank.jpg" };
      }

      const bracketMatch = token.match(/^(.+?)\((.+?)\)$/);
      if (bracketMatch) {
        const displayText = bracketMatch[1];
        const symbolWord = bracketMatch[2].toLowerCase();
        const symbol = `images/symbols/${symbolWord[0]}/${symbolWord}.jpg`;

        return { text: displayText, symbol };
      }

      if (!cleanToken) return { text: token, symbol: "images/blank.jpg" };

      const displayText = token.includes("_") ? token.replace(/_/g, " ") : token;
      const symbol = `images/symbols/${cleanToken[0]}/${cleanToken}.jpg`;

      return { text: displayText, symbol };
    });

    setProcessedWords(processed);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSentence(input);
    processInput(input);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);  // Update title as user types
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => window.print();
  const toggleOptions = () => setShowOptions(!showOptions);
  const toggleLearningMode = () => setLearningMode(!learningMode);
  const toggleHelp = () => setShowHelp(!showHelp);  // Toggle Help dialog

  return (
    <div className={`App ${options.monospaced ? 'monospaced' : ''}`}>
      <AppBar 
        handlePrint={handlePrint} 
        toggleOptions={toggleOptions} 
        toggleLearningMode={toggleLearningMode}
        toggleHelp={toggleHelp}  // Add Help button functionality
      />

      {learningMode ? (
        <SymbolLearningMode symbolsData={multiWordSymbols} exitLearningMode={toggleLearningMode} />
      ) : (
        <div className="sentence-section">
          <SentenceInput sentence={sentence} onInputChange={handleInputChange} />

          {/* Editable Title Below Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Type title here..."
            className="sentence-title"
          />

          {/* Display Symbols */}
          <WordDisplay processedWords={processedWords} speakWord={speakWord} options={options} />
        </div>
      )}

      {/* Show Options Dialog */}
      {showOptions && (
        <OptionsDialog options={options} setOptions={setOptions} toggleDialog={toggleOptions} />
      )}

      {/* Show Help Dialog */}
      {showHelp && (
        <HelpDialog toggleDialog={toggleHelp} />
      )}
    </div>
  );
}

export default App;
