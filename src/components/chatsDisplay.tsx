import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Chat {
  id: string;
  nome: string;
}

interface ChatsDisplayProps {
  chats: Chat[];
  refreshChats: () => void;
}

export function ChatsDisplay({ chats, refreshChats }: ChatsDisplayProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newChatName, setNewChatName] = useState<string>("");

  const handleDeleteChat = async (chatId: string) => {
    const response = await fetch(`/api/chat/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Toast de erro
      console.error("Erro ao deletar o chat");
    } else {
      // Toast de sucesso
      // Atualizar a lista de chats
      console.log("Chat deletado com sucesso");
    }
    refreshChats(); // Chama a função para atualizar a lista de chats
  };

  const handlePatchChat = async (id: string) => {
    const response = await fetch(`/api/chat/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: newChatName }),
    });
    if (!response.ok) {
      // Toast de erro
      console.error("Erro ao atualizar o nome do chat");
    } else {
      // Toast de sucesso
      // Atualizar a lista de chats, se necessário
      console.log("Nome do chat atualizado com sucesso");
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col w-full max-h-full gap-1 overflow-y-auto border-1 rounded-xl rounded-t-none">
      {chats.map((chat, index) => (
        <div
          key={chat.id}
          className={`flex p-2 w-full justify-between gap-2 rounded-xl ${
            chats.length > 1 && chats.length !== index + 1 ? "border-b-1" : ""
          }`}
        >
          {isEditing ? (
            <div className="flex w-full gap-2 justify-between">
              <input
                type="text"
                defaultValue={chat.nome}
                className="w-full focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none"
                ref={inputRef}
                onChange={(e) => {
                  setNewChatName(e.target.value);
                }}
                onBlur={() => setIsEditing(false)}
              />
              <button
                onClick={() => {
                  setIsEditing(false);
                  handlePatchChat(chat.id);
                }}
                className="text-white rounded-sm overflow-hidden hover:bg-[#3a3c44] hover:cursor-pointer"
              >
                <Check className="rounded-sm bg-green-700 mr-2 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300" />
              </button>
            </div>
          ) : (
            <div className="flex w-full gap-2 justify-between">
              <Link href={`/chatbot/${chat.id}`} className="w-full">
                <button
                  className="text-white rounded-sm overflow-hidden hover:bg-[#3a3c44] hover:cursor-pointer"
                >
                  {chat.nome}
                </button>
              </Link>
              <div className="flex gap-2">
                <Pencil
                  onClick={() => setIsEditing(true)}
                  className="rounded-sm bg-blue-700 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
                ></Pencil>
                <Trash
                  onClick={() => handleDeleteChat(chat.id)}
                  className="rounded-sm shadow-lg bg-red-700 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
                ></Trash>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
