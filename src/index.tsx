import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';

// Assuming there's a global config object provided before this script runs
declare global {
  interface Window { chatConfig?: any; }
}

// Render the App component with configuration from the global variable
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
