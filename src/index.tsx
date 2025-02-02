import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    chatConfig?: any;
  }
}

const userConfig = window.chatConfig || {};
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App
      endpoint={userConfig.endpoint}
      aiIcon={userConfig.aiIcon}
      titleText={userConfig.titleText}
      placeholder={userConfig.placeholder}
      humanIcon={userConfig.humanIcon}
      chatIcon={userConfig.chatIcon}
    />
  </React.StrictMode>,
);
