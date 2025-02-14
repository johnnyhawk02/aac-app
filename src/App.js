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
    // Build a lookup map for all symbols (lowercase, spaces normalized)
    const symbolMap = new Map();
    allSymbols.forEach((s) => {
      const normalizedPhrase = s.phrase.replace(/_/g, " ").trim().toLowerCase();
      symbolMap.set(normalizedPhrase, s.icon);
    });
  
    const tokens = input.split(" ");
    const processed = tokens.map(token => {
      let cleanToken = token.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
      if (!cleanToken) {
        return { text: token, icon: "images/blank.jpg" };
      }
  
      // Handle bracket syntax: word(symbol)
      const bracketMatch = token.match(/^(.+?)\((.+?)\)$/);
      if (bracketMatch) {
        const displayText = bracketMatch[1];
        const symbolWord = bracketMatch[2].replace(/_/g, " ").trim().toLowerCase();
        const symbol = symbolMap.get(symbolWord) || "images/blank.jpg";
  
        console.log(`🔍 Bracketed Token: "${displayText}" → "${symbol}"`);
        return { text: displayText, icon: symbol };
      }
  
      // Convert underscores to spaces for standard lookup
      const displayText = token.replace(/_/g, " ").trim();
      const symbol = symbolMap.get(displayText) || "images/blank.jpg";
  
      console.log(`🔍 Token: "${displayText}" → "${symbol}"`);
  
      return { text: displayText, icon: symbol };
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
    let updatedSentence = sentence.trim();
  
    // Insert word and close the bracket if needed
    if (updatedSentence.endsWith("(")) {
      updatedSentence += word + ")";
    } else {
      // Insert without a space if the input is empty
      updatedSentence += updatedSentence === "" ? word : ` ${word}`;
    }
  
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
