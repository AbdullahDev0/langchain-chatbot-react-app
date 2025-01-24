"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

import { ChatMessageBubble } from "./ChatMessageBubble";
import { FaRobot } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from 'react-icons/md';


export function ChatWindow(props: {
  endpoint: string;
  placeholder?: string;
  titleText?: string;
  aiIcon?: string;
  humanIcon?: string;
  chatIcon?: string;
  initialMessage?: string;
  uploadEndpoint?: string;
  showUpload?: boolean;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const themeChangeHandler = (e: { matches: any; }) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", themeChangeHandler);
    setTheme(mediaQuery.matches ? "dark" : "light");
    return () => mediaQuery.removeEventListener("change", themeChangeHandler);
  }, []);

  // Function to toggle the theme on button click
  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === "light" ? "dark" : "light");
  };



  // Determine if the screen width is 768px or less
const isMobile = window.innerWidth <= 768;

const chatWindowStyles: CSSProperties = {
  flex: 1,
  flexDirection: "column",
  overflow: "hidden",
  backgroundColor: theme === "dark" ? "#333333" : "white",
  color: theme === "dark" ? "#fff" : "#000",
  position: "fixed",
  bottom: isMobile ? "160px" : "100px", // Adjusted for mobile
  right: isMobile ? "60px" : "40px", // Adjusted for mobile
  borderRadius: "10px",
  width: isMobile ? "90%" : "400px", // Optional: Adjust width for mobile
};

// Apply chatWindowStyles to your chat window component


  const { endpoint, placeholder, aiIcon, humanIcon, chatIcon, titleText, initialMessage } = props;

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: endpoint,
    body: props.showUpload && sessionId ? {
      sessionId: sessionId
    } : undefined,
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    onError: (e) => {
      // Convert technical error message to user-friendly message
      let userFriendlyMessage = "I'm having trouble responding right now. Please try again in a moment.";
      
      if (e.message.includes("Failed to fetch") || e.message.includes("network")) {
        userFriendlyMessage = "Unable to connect. Please check your internet connection and try again.";
      } else if (e.message.includes("timeout")) {
        userFriendlyMessage = "The response took too long. Please try again.";
      }

      messages.push({
        id: 'error-' + Date.now(),
        content: userFriendlyMessage,
        createdAt: new Date(Date.now()),
        role: "assistant"
      });
    }
  });

  useEffect(() => {
    if(!messages.length){
      messages.push({
        id: 'initial',
        content: initialMessage || 'Hi, how may I help you?',
        createdAt: new Date(Date.now()),
        role: "assistant"
      })
    }
  },[])

  // Get upload endpoint from props or use default
  const uploadEndpoint = props.uploadEndpoint || 'http://localhost:3500/api/v1/langchain-chat/process-document';

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading ?? false) {
      return;
    }
    handleSubmit(e);
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Generate a unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', newSessionId);

    try {
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Store session ID and filename in component state
      setSessionId(newSessionId);
      setUploadedFile(file.name);

      // Show success message
      messages.push({
        id: 'upload-' + Date.now(),
        content: `Document "${file.name}" uploaded successfully!`,
        createdAt: new Date(Date.now()),
        role: "assistant"
      });

    } catch (error) {
      // Show error message
      messages.push({
        id: 'error-' + Date.now(),
        content: "Failed to upload document. Please try again.",
        createdAt: new Date(Date.now()),
        role: "assistant"
      });
      setSessionId(null);
      setUploadedFile(null);
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <button
        className="chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {chatIcon ?? <FaRobot />}
      </button>
      <div style={chatWindowStyles}>
        {isChatOpen && (
          <>
            <div className="chat-header" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
              <div>{titleText}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {props.showUpload && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    {uploadedFile ? (
                      <div className="uploaded-file-name" style={{ fontSize: '12px' }}>
                        {uploadedFile}
                      </div>
                    ) : (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="submit-button upload-button"
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload Doc'}
                      </button>
                    )}
                  </>
                )}
                <button onClick={toggleTheme} className="theme-toggle-button">
                  <div className={theme === 'dark' ? "icon-wrapper" : "icon-wrapper dark-mode"}>
                    {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                  </div>
                </button>
              </div>
            </div>
            <div className="chat-container">
              <div
                ref={messageContainerRef}
              >
                {messages.length > 0 ? (
                  [...messages]
                    .map((m, i) => <ChatMessageBubble key={m.id} message={m} aiIcon={aiIcon} humanIcon={humanIcon} />
                    )
                ) : ""}
              </div>
            </div>
          </>
        )}


        {isChatOpen && (
          <form onSubmit={sendMessage} className="form-container">
            <div className="chat-input">
              <textarea
                className="input-field"
                value={input}
                placeholder={placeholder ?? "Type your message here..."}
                onChange={(e) => {
                  handleInputChange(e);
                  // Get the computed line height
                  const lineHeight = parseInt(window.getComputedStyle(e.target).lineHeight);
                  const lines = e.target.value.split('\n').length;
                  const contentHeight = e.target.scrollHeight;
                  
                  // Only adjust height if content actually needs more than one line
                  if (contentHeight > lineHeight && contentHeight > 32) {
                    const newHeight = Math.min(contentHeight, 96); // Max 3 lines
                    e.target.style.height = `${newHeight}px`;
                  } else {
                    e.target.style.height = '32px'; // Keep at single line height
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const form = e.currentTarget.form;
                    if (form) form.requestSubmit();
                  }
                }}
                rows={1}
                style={{ height: '32px' }} // Force initial height
              />
              <button type="submit" className="submit-button">
                {chatEndpointIsLoading ? (
                  <div role="status" className="flex justify-center">
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
