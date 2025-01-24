import React from 'react';
import './App.css';
import { ChatWindow } from './components/ChatWindow';

// Define a type for the expected props
interface AppProps {
  endpoint?: string;
  uploadEndpoint?: string;
  showUpload?: boolean;
  placeholder?: string;
  titleText?: string;
  aiIcon?: string;
  humanIcon?: string;
  chatIcon?: string;
}

// Update the App component to accept props
function App({ endpoint, uploadEndpoint, showUpload, aiIcon, titleText, placeholder, humanIcon, chatIcon }: AppProps) {
  // Use props if they're provided, otherwise fall back to defaults
  return (
    <ChatWindow
      endpoint={endpoint || "http://localhost:3500/api/v1/langchain-chat/session-document-chat"}
      uploadEndpoint={uploadEndpoint}
      showUpload={showUpload}
      aiIcon={aiIcon}
      humanIcon={humanIcon}
      chatIcon={chatIcon}
      placeholder={placeholder || "Ask a question..."}
      titleText={titleText || 'Chatbot'}
    ></ChatWindow>
  );
}

export default App;
