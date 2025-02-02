import React from "react";
import "./App.css";
import { ChatWindow } from "./components/ChatWindow";

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

function App({
  endpoint,
  uploadEndpoint,
  showUpload,
  aiIcon,
  titleText,
  placeholder,
  humanIcon,
  chatIcon,
}: AppProps) {
  return (
    <ChatWindow
      endpoint={
        endpoint ||
        "http://localhost:3500/api/v1/langchain-chat/session-document-chat"
      }
      uploadEndpoint={uploadEndpoint}
      showUpload={showUpload}
      aiIcon={aiIcon}
      humanIcon={humanIcon}
      chatIcon={chatIcon}
      placeholder={placeholder || "Ask a question..."}
      titleText={titleText || "Chatbot"}
    ></ChatWindow>
  );
}

export default App;
