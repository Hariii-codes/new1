import React from 'react';

const ChatbotLink: React.FC = () => {
  return (
    <a 
      href="http://127.0.0.1:5000" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
    >
      Open Loan Assistant
    </a>
  );
};

export default ChatbotLink;