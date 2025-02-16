// File: App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './components/WordDisplay';
import OptionsDialog from './components/OptionsDialog';
import SymbolLearningMode from './components/SymbolLearningMode';
import AppBar from './components/AppBar';
import HelpDialog from './components/HelpDialog';
import SearchDialog from './components/SearchDialog';
import ImageUpload from './components/ImageUpload';
import SentenceInput from './components/SentenceInput';

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
    fontSize: 60,
    imageSize: 60,
    monospaced: false,
    tilePadding: 10,
    tileGap: 10,
    imageSymbolGap: 20,
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

    const lines = input.split('\n');
    const processed = [];
    lines.forEach((line, lineIndex) => {
      const tokens = line.split(" ").filter(token => token.trim() !== "");
      tokens.forEach((token) => {
        let cleanToken = token.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
        let processedToken;
        if (!cleanToken) {
          processedToken = { text: token, icon: "images/blank.jpg" };
        } else {
          const bracketMatch = token.match(/^(.+?)\((.+?)\)$/);
          if (bracketMatch) {
            const displayText = bracketMatch[1];
            const symbolWord = bracketMatch[2].replace(/_/g, " ").trim().toLowerCase();
            const symbol = symbolMap.get(symbolWord) || "images/blank.jpg";
            processedToken = { text: displayText, icon: symbol };
          } else {
            const displayText = token.replace(/_/g, " ").trim();
            const symbol = symbolMap.get(displayText.toLowerCase()) || "images/blank.jpg";
            processedToken = { text: displayText, icon: symbol };
          }
        }
        processed.push(processedToken);
      });
      if (lineIndex < lines.length - 1) {
        processed.push({ type: 'newline' });
      }
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
    <div className="app-container">
      <div className="side-app-bar">
        <AppBar
          handlePrint={handlePrint}
          toggleOptions={toggleOptions}
          toggleLearningMode={toggleLearningMode}
          toggleHelp={toggleHelp}
          toggleSearch={toggleSearch}
          removeImage={removeImage}
          setImageSrc={setImageSrc}
          sentence={sentence}
          onInputChange={handleInputChange}
        />
      </div>
      <div className="main-page">
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
            {showSearch && (
              <SearchDialog symbols={allSymbols} insertWord={insertWord} closeDialog={toggleSearch} />
            )}
            <div style={{ marginTop: `${options.imageSymbolGap}px` }}>
              <WordDisplay processedWords={processedWords} speakWord={speakWord} options={options} />
            </div>
          </div>
        )}
        {showOptions && <OptionsDialog options={options} setOptions={setOptions} toggleDialog={toggleOptions} />}
        {showHelp && <HelpDialog toggleDialog={toggleHelp} />}
      </div>
    </div>
  );
}

export default App;
