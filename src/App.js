// File: App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './components/WordDisplay';
import SentenceInput from './components/SentenceInput';
import OptionsDialog from './components/OptionsDialog';
import SymbolLearningMode from './components/SymbolLearningMode';
import AppBar from './components/AppBar';
import HelpDialog from './components/HelpDialog';
import SearchButton from './components/SearchButton';
import SearchDialog from './components/SearchDialog';

function App() {
  const [sentence, setSentence] = useState("");
  const [processedWords, setProcessedWords] = useState([]);
  const [multiWordSymbols, setMultiWordSymbols] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]); // New state for symbols.json
  const [showOptions, setShowOptions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [learningMode, setLearningMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState({
    fontSize: 'medium',
    imageSize: 'medium',
    monospaced: false,
  });

  // Fetch multiword symbols and all symbols from symbols.json
  useEffect(() => {
    fetch('/multiword_symbols.json')
      .then((res) => res.json())
      .then((data) => setMultiWordSymbols(data))
      .catch((err) => console.error('Failed to load multiword symbols:', err));

    fetch('/symbols.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Loaded symbols:', data);
        setAllSymbols(data);
      })
      .catch((err) => console.error('Failed to load symbols:', err));
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
    setTitle(e.target.value);
  };

  const insertWord = (word) => {
    const updatedSentence = sentence.trim() === '' ? word : `${sentence} ${word}`;
    setSentence(updatedSentence);
    processInput(updatedSentence);
    setShowSearch(false);
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => window.print();
  const toggleOptions = () => setShowOptions(!showOptions);
  const toggleLearningMode = () => setLearningMode(!learningMode);
  const toggleHelp = () => setShowHelp(!showHelp);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <div className={`App ${options.monospaced ? 'monospaced' : ''}`}>
      <AppBar 
        handlePrint={handlePrint} 
        toggleOptions={toggleOptions} 
        toggleLearningMode={toggleLearningMode}
        toggleHelp={toggleHelp}
      />

      {learningMode ? (
        <SymbolLearningMode symbolsData={multiWordSymbols} exitLearningMode={toggleLearningMode} />
      ) : (
        <div className="sentence-section">
          {/* Sentence Input */}
          <SentenceInput sentence={sentence} onInputChange={handleInputChange} />

          {/* Search Button */}
          <SearchButton openDialog={toggleSearch} />

          {/* Search Dialog */}
          {showSearch && (
            <SearchDialog
              symbols={allSymbols}
              insertWord={insertWord}
              closeDialog={toggleSearch}
            />
          )}

          {/* Editable Title */}
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

      {showOptions && <OptionsDialog options={options} setOptions={setOptions} toggleDialog={toggleOptions} />}
      {showHelp && <HelpDialog toggleDialog={toggleHelp} />}
    </div>
  );
}

export default App;
