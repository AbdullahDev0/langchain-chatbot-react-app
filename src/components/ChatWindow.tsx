"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

import { ChatMessageBubble } from "./ChatMessageBubble";


export function ChatWindow(props: {
  endpoint: string,
  placeholder?: string,
  emoji?: string;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [failedMessages, setFailedMessages] = useState<{ id: string, content: string, role: 'assistant' }[]>([]);

  useEffect(() => {
    // Detect system theme and listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const themeChangeHandler = (e: { matches: any; }) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', themeChangeHandler);
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    return () => mediaQuery.removeEventListener('change', themeChangeHandler);
  }, []);

  const chatWindowStyles: CSSProperties = {
    flex: 1,
    flexDirection: 'column',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    position: 'absolute',
    bottom: '60px',
    right: '20px',
  };

  const { endpoint, placeholder, emoji } = props;


  const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, any>>({});

  const { messages, input, handleInputChange, handleSubmit, isLoading: chatEndpointIsLoading } =

    useChat({
      api: endpoint,
      onResponse(response) {
        const sourcesHeader = response.headers.get("x-sources");
        const sources = sourcesHeader ? JSON.parse((Buffer.from(sourcesHeader, 'base64')).toString('utf8')) : [];
        const messageIndexHeader = response.headers.get("x-message-index");
        if (sources.length && messageIndexHeader !== null) {
          setSourcesForMessages({ ...sourcesForMessages, [messageIndexHeader]: sources });
        }
      },
      // onError: (e) => {
      //   toast(e.message, {
      //     theme: "dark"
      //   });
      // }
      onError: (e) => {
        const failedMessage = {
          id: `failed-${new Date().getTime()}`,
          content: input,
          role: 'assistant' as const,
          createdAt: new Date().toISOString(),
        };
        setFailedMessages([...failedMessages, failedMessage]);
      }

    });
  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading ?? false) {
      return;
    }
    handleSubmit(e);

  }
  return (
    <>
      <button className='chat-button' onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </button>
      <div style={chatWindowStyles}>

        {isChatOpen && (
          <div
            ref={messageContainerRef}
          // style={{ maxHeight: '300px' }}
          >
            {messages.length > 0 ? (
              [...messages]
                .map((m, i) =>
                  <ChatMessageBubble key={m.id} message={m} aiEmoji={emoji} />
                )
            ) : ""}
          </div>
        )}

        {isChatOpen && (
          <div
            ref={messageContainerRef}
          >
            {([...messages, ...failedMessages].length > 0) ? (
              [...messages, ...failedMessages]
                .map((m) => {
                  console.log("Messages", m);

                  return <ChatMessageBubble key={m.id} message={m} aiEmoji={emoji} />
                })
            ) : ""}
          </div>
        )}


        {isChatOpen && (
          <form onSubmit={sendMessage} className="form-container">
            <div className="chat-input">
              <input
                className="input-field"
                value={input}
                placeholder={placeholder ?? "Type your message here..."}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-button">
                {chatEndpointIsLoading ? (
                  <div role="status" className="flex justify-center">
                    <span>Loading...</span>
                  </div>
                ) : "Send"}
              </button>
            </div>
          </form>
        )}

        <ToastContainer />
      </div>
    </>
  );

}
