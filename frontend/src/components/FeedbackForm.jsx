import React, { useEffect } from 'react';

const FeedbackForm = ({ message, feedbackForm, setFeedbackForm, submitCorrection }) => {
  useEffect(() => {
    // Pre-fill the form when it becomes visible
    setFeedbackForm({
      english: message.english,
      corrected: ''
    });
  }, [message, setFeedbackForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCorrection(message.id);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-2 bg-gray-600 rounded">
      <p className="text-sm">Original: {message.english}</p>
      <input
        type="text"
        placeholder="Enter correct Punjabi text"
        value={feedbackForm.corrected}
        onChange={(e) => setFeedbackForm({ ...feedbackForm, corrected: e.target.value })}
        className="w-full p-1 mt-1 bg-gray-800 text-white rounded"
        style={{ fontFamily: 'Anmol Lipi, sans-serif' }}
      />
      <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-1 rounded text-sm">
        Submit Correction
      </button>
    </form>
  );
};

export default FeedbackForm;