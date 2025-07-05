import React from 'react';

const InputSection = ({ text, setText, onTransliterate, onKeyPress, isLoading, isDarkMode, textareaRef }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type English text here..."
          className={`w-full p-2 border rounded-l-md resize-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          disabled={isLoading}
        />
        <button
          onClick={onTransliterate}
          disabled={isLoading}
          className="bg-purple-600 text-white p-2 rounded-r-md hover:bg-purple-700 disabled:bg-gray-500"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default InputSection;