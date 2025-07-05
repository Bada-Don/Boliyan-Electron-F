// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ChatContainer from './components/ChatContainer';
import InputSection from './components/InputSection';
import BackgroundParticles from './components/BackgroundParticles';
import About from './components/About';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const TransliterationApp = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({ key: '', value: '' });
  const [currentPage, setCurrentPage] = useState('home'); // home, about, contact
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const languages = [
    { value: 'en-pa', label: 'English to Punjabi' },
    { value: 'en-hi', label: 'English to Hindi', disable: true },
    { value: 'en-ar', label: 'English to Urdu', disable: true },
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    window.onFeedbackFormClose = () => setExpandedFeedback(null);
    return () => { window.onFeedbackFormClose = null; };
  }, []);

  const handleTransliterate = async () => {
    if (!text.trim()) return;

    const userMessage = { type: 'user', content: text, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setText('');

    try {
      const response = await axios.post('http://localhost:5000/transliterate', {
        text: text.trim().toLowerCase(),
        language: selectedLanguage
      });

      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          content: Object.values(response.data)[0],
          english: text.trim(),
          id: Date.now() + 1
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Transliteration error:', error);
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, something went wrong. Please try again.',
        isError: true,
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId, isCorrect) => {
    if (isCorrect) {
      return;
    }
    setExpandedFeedback(expandedFeedback === messageId ? null : messageId);
  };

  const submitCorrection = async (messageId, correctionData) => {
    // This function is called by the FeedbackForm component
    // The actual submission is handled within the FeedbackForm component itself
    console.log('Correction submitted for message:', messageId, correctionData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTransliterate();
    }
  };

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About isDarkMode={isDarkMode} />;
      case 'contact':
        return <Contact isDarkMode={isDarkMode} />;
      default:
        return (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              languages={languages}
              isDarkMode={isDarkMode}
            />

            <ChatContainer
              messages={messages}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
              chatContainerRef={chatContainerRef}
              onFeedback={handleFeedback}
              expandedFeedback={expandedFeedback}
              feedbackForm={feedbackForm}
              setFeedbackForm={setFeedbackForm}
              submitCorrection={submitCorrection}
            />

            <InputSection
              text={text}
              setText={setText}
              onTransliterate={handleTransliterate}
              onKeyPress={handleKeyPress}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
              textareaRef={textareaRef}
            />
          </div>
        );
    }
  };

  return (
    <>
      {showLoadingScreen && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/90' 
          : 'bg-white/60'
      }`}>
        <BackgroundParticles isDarkMode={isDarkMode} />

        <div className="relative z-10 flex flex-col h-screen">
          <Header 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {renderPage()}
        </div>
      </div>
    </>
  );
};

export default TransliterationApp;