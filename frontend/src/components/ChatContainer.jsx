import React from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndication from './LoadingIndication';
import EmptyState from './EmptyState';

const ChatContainer = (props) => {
  const { messages, isLoading, isDarkMode, chatContainerRef } = props;

  return (
    <div
      ref={chatContainerRef}
      className={`flex-1 overflow-y-auto p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-50'}`}
    >
      {messages.length === 0 && !isLoading && <EmptyState />}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} {...props} />
      ))}
      {isLoading && <LoadingIndication />}
    </div>
  );
};

export default ChatContainer;