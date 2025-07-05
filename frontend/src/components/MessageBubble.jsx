// components/MessageBubble.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';
import FeedbackForm from './FeedbackForm';

const MessageBubble = ({ 
  message, 
  isDarkMode, 
  onFeedback, 
  expandedFeedback, 
  feedbackForm, 
  setFeedbackForm, 
  submitCorrection 
}) => {
  const isUser = message.type === 'user';
  const isExpanded = expandedFeedback === message.id;
  const [useAnmolLipi, setUseAnmolLipi] = useState(true);
  const [copied, setCopied] = useState(false);
  const [feedbackDisabled, setFeedbackDisabled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      className={`flex mb-4 sm:mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg backdrop-blur-lg border text-sm sm:text-base ${
            isUser
              ? isDarkMode
                ? 'bg-blue-600/80 text-white border-blue-500/50' 
                : 'bg-blue-500/90 text-white border-blue-400/60'
              : message.isError
              ? isDarkMode
                ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30 text-red-100'
                : 'bg-gradient-to-r from-red-50/80 to-pink-50/80 border-red-300/50 text-red-800'
              : isDarkMode
              ? 'bg-black/60 text-white border-[#262626]'
              : 'bg-white/60 text-gray-800 border-[#e4e4e7]'
          }`}
        >
          <p className={`leading-relaxed break-words ${!isUser && useAnmolLipi ? 'anmol-lipi' : ''}`}>{message.content}</p>
          {/* Font toggle and copy button for bot messages */}
          {!isUser && !message.isError && (
            <div className="flex gap-2 mt-2">
              <button
                className={`px-2 py-1 rounded text-xs border ${
                  isDarkMode
                    ? useAnmolLipi 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-800 border-gray-700 text-gray-300'
                    : useAnmolLipi
                    ? 'bg-gray-200 border-gray-300 text-gray-800'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}
                onClick={() => setUseAnmolLipi((prev) => !prev)}
                title="Toggle AnmolLipi Font"
              >
                {useAnmolLipi ? 'Default Font' : 'AnmolLipi Font'}
              </button>
              <button
                className={`px-2 py-1 rounded text-xs border ${
                  isDarkMode
                    ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={async () => {
                  await navigator.clipboard.writeText(message.content);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
                title="Copy to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </motion.div>

        {!isUser && !message.isError && !feedbackDisabled && !isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 flex-wrap"
          >
            <span className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Was this correct?
            </span>
            <div className="flex gap-1 sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onFeedback(message.id, true);
                  setFeedbackDisabled(true);
                }}
                disabled={feedbackDisabled}
                className="p-1.5 sm:p-2 rounded-full hover:bg-green-500/20 text-green-500 transition-colors"
              >
                <HandThumbUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onFeedback(message.id, false);
                  setFeedbackDisabled(true);
                }}
                disabled={feedbackDisabled}
                className="p-1.5 sm:p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-colors"
              >
                <HandThumbDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <FeedbackForm
              messageId={message.id}
              isDarkMode={isDarkMode}
              feedbackForm={feedbackForm}
              setFeedbackForm={setFeedbackForm}
              submitCorrection={submitCorrection}
              onClose={() => {
                if (typeof window !== 'undefined' && window.onFeedbackFormClose) window.onFeedbackFormClose();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MessageBubble;