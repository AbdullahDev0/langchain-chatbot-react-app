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

## Building UMD Bundle

To generate the UMD bundle for distribution:

```bash
yarn build:umd
```

The resulting bundle will be available in the `build/` directory and can be served from your preferred hosting solution.

## Configuration Options

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `endpoint` | string | Main chat API endpoint | `http://localhost:3500/api/v1/langchain-chat/session-document-chat` |
| `uploadEndpoint` | string | Document upload API endpoint | `http://localhost:3500/api/v1/langchain-chat/process-document` |
| `showUpload` | boolean | Enable/disable file upload feature | `false` |
| `placeholder` | string | Input field placeholder text | "Ask a question..." |
| `titleText` | string | Chat window title | "Chatbot" |
| `aiIcon` | ReactNode | Custom AI message icon | Robot icon |
| `humanIcon` | ReactNode | Custom user message icon | Person icon |
| `chatIcon` | ReactNode | Custom chat toggle button icon | Robot icon |

## API Requirements

### Chat Endpoint

The chat endpoint should accept POST requests with the following structure:

```typescript
{
  messages: Array<{
    content: string;
    role: "user" | "assistant";
  }>;
  sessionId?: string; // Required when showUpload is true
}
```

#### Expected Response:
- Stream of text for normal responses
- JSON object for intermediate steps (must be valid AgentStep format)

#### Headers for source attribution:
- `x-sources`: Base64 encoded JSON array of sources (optional)
- `x-message-index`: Message index for source mapping

### Upload Endpoint

The upload endpoint should accept POST requests with FormData containing:
- `file`: File object (supported formats: .pdf, .doc, .docx, .txt)
- `sessionId`: Unique session identifier

#### Expected Response:

```typescript
{
  success: boolean;
  error?: string;
}
```

## Error Handling

The component handles various error scenarios:
- Network connectivity issues
- API timeout
- File upload failures
- Invalid responses

Error messages are displayed in the chat interface with user-friendly messages.

## Development

### Start Development Server
```bash
yarn start
```

### Build for Production
```bash
yarn build
```
