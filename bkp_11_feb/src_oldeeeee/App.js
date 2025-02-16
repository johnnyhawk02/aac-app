// File: App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './components/WordDisplay';
import SentenceInput from './components/SentenceInput';
import OptionsDialog from './components/OptionsDialog';
import SymbolLearningMode from './components/SymbolLearningMode';
import AppBar from './components/AppBar';
import HelpDialog from './components/HelpDialog';
import SearchDialog from './components/SearchDialog';
import ImageUpload from './components/ImageUpload';

function App() {
  const [sentence, setSentence] = useState("");
  const [processedWords, setProcessedWords] = useState([]);
  const [multiWordSymbols, setMultiWordSymbols] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [learningMode, setLearningMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [options, setOptions] = useState({
    fontSize: 60,    // Numeric value for fontSize
    imageSize: 60,   // Numeric value for imageSize in pixels
    monospaced: false,
  });

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
    const symbolMap = new Map();
    allSymbols.forEach((s) => {
      const normalizedPhrase = s.phrase.replace(/_/g, " ").trim().toLowerCase();
      symbolMap.set(normalizedPhrase, s.icon);
    });

    const tokens = input.split(" ").filter(token => token.trim() !== "");
    const processed = tokens.map(token => {
      let cleanToken = token.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
      if (!cleanToken) {
        return { text: token, icon: "images/blank.jpg" };
      }
      const bracketMatch = token.match(/^(.+?)\((.+?)\)$/);
      if (bracketMatch) {
        const displayText = bracketMatch[1];
        const symbolWord = bracketMatch[2].replace(/_/g, " ").trim().toLowerCase();
        const symbol = symbolMap.get(symbolWord) || "images/blank.jpg";
        return { text: displayText, icon: symbol };
      }
      const displayText = token.replace(/_/g, " ").trim();
      const symbol = symbolMap.get(displayText.toLowerCase()) || "images/blank.jpg";
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
    if (updatedSentence.endsWith("(")) {
      updatedSentence += word + ")";
    } else {
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
  const removeImage = () => {
    setImageSrc(null);
  };

  return (
    <div className={`App ${options.monospaced ? 'monospaced' : ''}`}>
      <AppBar
        handlePrint={handlePrint}
        toggleOptions={toggleOptions}
        toggleLearningMode={toggleLearningMode}
        toggleHelp={toggleHelp}
        toggleSearch={toggleSearch} // Pass toggleSearch to AppBar for search button
        removeImage={removeImage}
        setImageSrc={setImageSrc}
      />

      {learningMode ? (
        <SymbolLearningMode symbolsData={multiWordSymbols} exitLearningMode={toggleLearningMode} />
      ) : (
        <div className="sentence-section">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Type title here..."
            className="sentence-title"
          />

          <ImageUpload imageSrc={imageSrc} />

          {/* Remove the separate SearchButton – search is now in AppBar */}
          {showSearch && (
            <SearchDialog symbols={allSymbols} insertWord={insertWord} closeDialog={toggleSearch} />
          )}

          <SentenceInput sentence={sentence} onInputChange={handleInputChange} />

          <WordDisplay processedWords={processedWords} speakWord={speakWord} options={options} />
        </div>
      )}

      {showOptions && <OptionsDialog options={options} setOptions={setOptions} toggleDialog={toggleOptions} />}
      {showHelp && <HelpDialog toggleDialog={toggleHelp} />}
    </div>
  );
}

export default App;
