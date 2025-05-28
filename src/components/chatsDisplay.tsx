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
          className="flex p-2 w-full justify-between rounded-lg shadow-md"
        >
          <button className="text-white hover:cursor-pointer">{chat.nome}</button>
          <button className="hover:cursor-pointer">
          <Trash className="bg-red-600"></Trash>
          </button>
        </div>
      ))}
    </div>
  );
}
