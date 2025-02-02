import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    chatConfig?: any;
  }
}

/**
 * mountApp: This function mounts (or re-mounts) your App into #root
 * with any config you want to pass. This will be exposed as a global
 * on `window.LangChainReactApp.mountApp` in the UMD build.
 */
export function mountApp(config?: Record<string, any>) {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error('No <div id="root"></div> in the HTML.');
    return;
  }

  const userConfig = { ...window.chatConfig, ...config };

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App
        endpoint={userConfig.endpoint}
        uploadEndpoint={userConfig.uploadEndpoint}
        showUpload={userConfig.showUpload}
        aiIcon={userConfig.aiIcon}
        titleText={userConfig.titleText}
        placeholder={userConfig.placeholder}
        humanIcon={userConfig.humanIcon}
        chatIcon={userConfig.chatIcon}
      />
    </React.StrictMode>,
  );
}
