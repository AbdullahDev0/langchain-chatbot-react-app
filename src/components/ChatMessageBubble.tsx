import type { Message } from "ai/react";
export function ChatMessageBubble(props: { message: Message, aiEmoji?: string, sources: any[] }) {
  const isUserMessage = props.message.role === "user";
  const bubbleClass = `message-bubble ${isUserMessage ? 'message-bubble-user' : 'message-bubble-ai'}`;
  const prefix = isUserMessage ? "🧑" : props.aiEmoji;

  return (
    <div className={bubbleClass}>
      <div className="message-prefix">
        {prefix}
      </div>
      <div className="message-content">
        <span>{props.message.content}</span>
      </div>
    </div>
  );
}
