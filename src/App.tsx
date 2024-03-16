import React from 'react';
import './App.css';
import { ChatWindow } from './components/ChatWindow';

// Define a type for the expected props
interface AppProps {
  endpoint?: string;
  emoji?: string;
  titleText?: string;
  placeholder?: string;
}

// Update the App component to accept props
function App({ endpoint, emoji, titleText, placeholder }: AppProps) {
  // Use props if they're provided, otherwise fall back to defaults
  return (
    <ChatWindow
      endpoint={endpoint || "http://localhost:8000/api/v1/general-chat"}
      emoji={emoji || "🏴‍☠️"}
      placeholder={placeholder || "Ask a question..."}
    ></ChatWindow>
  );
}

export default App;
