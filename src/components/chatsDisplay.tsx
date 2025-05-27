import { Trash } from "lucide-react";

interface Chat {
  id: string;
  nome: string;
}

export function ChatsDisplay({chats}: {chats: Chat[]}) {
  return (
    <div className="flex flex-col w-full max-h-full overflow-y-auto gap-4 border-1 rounded-xl">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex p-4 w-full bg-gray-800 justify-between rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-white">{chat.nome}</h2>
          <Trash className="bg-red-600"></Trash>
        </div>
      ))}
    </div>
  );
}
