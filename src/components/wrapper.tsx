import Bubble from "./bubble";

interface Mensagem {
  id: number;
  texto: string;
  userRole: "USER" | "CHAT";
}

export default function Wrapper({ messages }: { messages: Mensagem[] }) {
  return (
    <div className={`flex flex-col w-full bg-[#1b1c21]`}>
        <div className="flex flex-col gap-4">
          {messages.map((msg: Mensagem) => (
            <Bubble
              key={msg.id}
              message={msg.texto}
              userRole={msg.userRole}
            ></Bubble>
          ))}
        </div>
    </div>
  );
}
