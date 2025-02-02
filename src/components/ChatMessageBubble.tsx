import type { Message } from "ai/react";
import { AiFillRobot } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

export function ChatMessageBubble(props: {
  message: Message;
  aiIcon?: string;
  humanIcon?: string;
}) {
  const isUserMessage = props.message.role === "user";
  const bubbleClass = `message-bubble ${isUserMessage ? "message-bubble-user" : "message-bubble-ai"}`;
  const prefix = isUserMessage
    ? (props.humanIcon ?? <IoPerson />)
    : (props.aiIcon ?? <AiFillRobot />);

  return (
    <div className={bubbleClass}>
      <div className="message-prefix">{prefix}</div>
      <div className="message-content">
        <span>{props.message.content}</span>
      </div>
    </div>
  );
}
