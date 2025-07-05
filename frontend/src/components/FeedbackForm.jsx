import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const FeedbackForm = ({ 
  messageId, 
  isDarkMode, 
  feedbackForm, 
  setFeedbackForm, 
  submitCorrection, 
  onClose, 
  message 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackForm.key || !feedbackForm.value) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('https://boliyan-production.up.railway.app/api/feedback', {
        key: feedbackForm.key.toLowerCase(),
        value: feedbackForm.value
      });

      setSubmitStatus('success');
      setFeedbackForm({ key: '', value: '' });
      
      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (error) {
      console.error('Feedback submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFeedbackForm({ key: '', value: '' });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`mt-3 p-4 rounded-lg border ${
        isDarkMode 
          ? 'bg-black/40 border-gray-700' 
          : 'bg-white/60 border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Provide Feedback
        </h3>
        <button
          onClick={handleClose}
          className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-600 text-gray-400' 
              : 'hover:bg-gray-300 text-gray-600'
          }`}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={`block text-xs font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Key
          </label>
          <input
            type="text"
            value={feedbackForm.key}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, key: e.target.value }))}
            placeholder="Enter key (e.g., harshdeep)"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:outline-none focus:ring-2`}
            required
          />
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Value
          </label>
          <input
            type="text"
            value={feedbackForm.value}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, value: e.target.value }))}
            placeholder="Enter value (e.g., hrSdIp)"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:outline-none focus:ring-2`}
            required
          />
        </div>

        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-3 py-2 rounded-lg text-sm ${
              submitStatus === 'success'
                ? isDarkMode
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-green-50 text-green-700 border border-green-200'
                : isDarkMode
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {submitStatus === 'success' 
              ? 'Feedback submitted successfully!' 
              : 'Failed to submit feedback. Please try again.'
            }
          </motion.div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting || !feedbackForm.key || !feedbackForm.value}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isSubmitting || !feedbackForm.key || !feedbackForm.value
                ? isDarkMode
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClose}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
