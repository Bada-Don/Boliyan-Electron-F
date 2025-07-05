import React from 'react';

const LoadingIndication = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-700 text-white p-3 rounded-lg">
        <span className="animate-pulse">● ● ●</span>
      </div>
    </div>
  );
};

export default LoadingIndication;