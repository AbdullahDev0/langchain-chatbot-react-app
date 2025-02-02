# React AI Chat Component

A flexible and customizable React chat component that supports context-aware conversations and document processing. This component provides a modern chat interface with support for file uploads, dark/light mode, and intermediate step visualization for AI responses.

## Features

- 🤖 Context-aware AI chat interface
- 📁 Document upload and processing
- 🌓 Dark/light mode support with system preference detection
- 💬 Intermediate step visualization for AI actions
- 📱 Responsive design (mobile & desktop)
- ⚙️ Highly customizable (icons, text, endpoints)
- 🌍 **UMD build for easy integration into HTML files** (No build step required!)
- 🧠 **Powered by LangChain for AI-driven chat interactions**
- 🔓 **Open-source under the Mozilla Public License 2.0 (MPL 2.0)**

AI chatbot was originally built to support four powerful chat modes, making it highly adaptable for different use cases:

1. Simple Chat – Standard AI-powered Q&A interactions for general conversations.

2. Contextual Chat – Maintains conversation history to provide context-aware responses across multiple interactions.

3. Document-Based Chat – Allows users to upload documents (PDF, DOC, TXT), with retrieval powered by vector stores (PostgreSQL/Redis) for efficient search and knowledge extraction.

4. Agent-Assisted Chat (Tavily Search) – Enables real-time web search using Tavily API, providing the latest information from the internet.

## Installation (NPM Package)

You can install the package from NPM:

```bash
yarn add langchain-chatbot-react-app
```

or using npm:

```bash
npm install langchain-chatbot-react-app
```

## UMD Usage (Direct HTML Integration)

This component is built as a **UMD (Universal Module Definition) bundle**, making it easy to use in HTML pages without requiring a build step. This is useful for integrating the chat component into existing websites or content management systems.

### Basic HTML Integration

1. Add the required React and ReactDOM scripts in your HTML `<head>`:

```html
<head>
  <!-- React and ReactDOM must be loaded before the component -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Your chat component UMD bundle -->
  <script src="path/to/your/build/chat-component.umd.js"></script>
</head>
```

2. Add the root div at the end of your HTML body:

```html
<body>
  <!-- Your existing content -->
  <div id="root"></div>
</body>
```

3. Initialize the chat component:

```html
<script>
  window.LangChainReactApp.mountApp({
    endpoint: window.chatConfig.endpoint,
    titleText: window.chatConfig.titleText,
    placeholder: window.chatConfig.placeholder,
    showUpload: window.chatConfig.showUpload,
    uploadEndpoint: window.chatConfig.showUpload ? window.chatConfig.uploadEndpoint : undefined
  });
</script>
```

### Configuration via Global Object

Instead of passing options manually, you can set configuration through a global `chatConfig` object:

```html
<script>
  window.chatConfig = {
    endpoint: 'https://your-api.example.com/chat',
    titleText: 'Custom Chat Title',
    placeholder: 'Type your message...',
    showUpload: true,
    uploadEndpoint: 'https://your-api.example.com/upload'
  };
</script>
```

## Built with LangChain

This chat component is powered by **LangChain**, which provides AI-driven natural language processing capabilities. The following LangChain packages are used:
- `langchain`
- `@langchain/community`
- `@langchain/openai`

These packages allow for context-aware responses, intelligent chat processing, and integration with OpenAI models.

## License

This project is **open-source** and licensed under the **Mozilla Public License 2.0 (MPL 2.0)**. This ensures that any modifications to this project remain open-source while allowing it to be combined with proprietary software. See the full license in the `LICENSE` file or visit [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Building UMD Bundle

To generate the UMD bundle for distribution:

```bash
yarn build:umd
```

The resulting bundle will be available in the `build/` directory and can be served from your preferred hosting solution.

## Contribution and Feedback

We welcome contributions and constructive criticism to improve this project! If you have suggestions, feature requests, or find a bug, feel free to open an issue or a pull request on our [GitHub repository](https://github.com/AbdullahDev0/langchain-chatbot-react-app). Your feedback is highly appreciated and helps us make this chat component even better.
