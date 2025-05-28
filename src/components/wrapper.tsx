import { useEffect, useRef } from "react";
import Bubble from "./bubble";

interface Mensagem {
  id: string;
  texto: string;
  role: "USER" | "CHAT";
}

export default function Wrapper({ messages }: { messages: Mensagem[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col w-full bg-[#1b1c21]`}>
      <div className="flex flex-col gap-4">
        {messages.map((msg: Mensagem) => (
          <Bubble key={msg.id} message={msg.texto} role={msg.role}></Bubble>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
