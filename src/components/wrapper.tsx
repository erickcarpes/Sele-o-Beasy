import { useEffect, useRef } from "react";
import Bubble from "./bubble";

interface Messages {
  id: string;
  content: string;
  role: "USER" | "CHAT";
  createdAt?: Date;
}

export default function Wrapper({ messages }: { messages: Messages[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col w-full bg-[#1b1c21]`}>
      <div className="flex flex-col gap-4">
        {messages.map((msg: Messages) => (
          <Bubble key={msg.id} message={msg.content} role={msg.role} createdAt={msg.createdAt}></Bubble>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
